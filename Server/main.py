from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import numpy as np
import pickle
from bson import ObjectId
import datetime

import db
from KC import get_KC
from water_req import get_ET0
import xgboost as xgb
from sklearn.linear_model import LinearRegression


# loading XGBoost Model
model_path = "model/XGBoost.pkl"
with open(model_path, "rb") as file:
    XB = pickle.load(file)
file.close()

model_path = "model/lr.pkl"
with open(model_path, "rb") as file:
    LR = pickle.load(file)
file.close()

feature_path = "data/exp_feature.pkl"
with open(feature_path, "rb") as file:
    expected_features = pickle.load(file)
file.close()

#########################################

# Get Client Conn
client = db.get_client()

# Check DB Connection
db.test_conn(client)

MyDb = client["agricare"]
Crops = MyDb["crops"]


####################################################################################

sample_data = {
    "N": 90,
    "P": 42,
    "K": 43,
    "temperature": 20.87974371,
    "humidity": 82.00274423,
    "pH": 6.502985292000001,
    "rainfall": 202.9355362,
}

new_row_processed = {
    "Crop": "Potato",
    "Season": "Karnataka",
    "State": "Assam",
    "Area": 28755,
    "Production": 317052,
    "Annual_Rainfall": 1260.8,
    "Fertilizer": 2840994,
}

sample_data = {
    "_id": ObjectId("66253e280c85bcd4e9b63f57"),
    "userId": "6620c35e26a6c64a8c4b5870",
    "cropId": "rice181",
    "crop": "Rice",
    "startDate": datetime.datetime(2024, 2, 18, 18, 29, 54, 600000),
    "lastUpdate": datetime.datetime(2024, 2, 18, 18, 29, 54, 600000),
    "lastIrrigation" : None ,
    "location": {"latitude": 23.831457, "longitude": 91.2867777},
    "area": 6000,
    "water": [0],
    "harvested": False,
    "__v": 0,
    "period": 100,
}


######################################

# creating flask server
app = Flask(__name__)
CORS(app)


# crop yield
@app.route("/api/crop_yield", methods=["POST"])
def crop_yield():
    try:
        data = request.get_json()
        new_df = pd.DataFrame([data])
        categorical_columns = ["Crop", "Season", "State"]
        new_df_encoded = pd.get_dummies(
            new_df, columns=categorical_columns, drop_first=True
        )
        new_df_transformed = new_df_encoded.reindex(
            columns=expected_features, fill_value=0
        )
        predictions = LR.predict(new_df_transformed)
        response = jsonify({"prediction": predictions[0][0]})
        return response
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 500


# crop recommendation
@app.route("/api/crop_recommender", methods=["POST"])
def crop_recommend():
    try:
        data = request.get_json()
        # print(data)
        # get all data from post request as sample_data
        N = data["N"]
        P = data["P"]
        K = data["K"]
        temperature = data["temperature"]
        humidity = data["humidity"]
        pH = data["pH"]
        rainfall = data["rainfall"]

        # prdicting the crop
        prediction = XB.predict(
            np.array([[N, P, K, temperature, humidity, pH, rainfall]])
        )
        label_mapping_filename = 'data/label_mapping.pkl'
        with open(label_mapping_filename, 'rb') as label_mapping_file:
            loaded_label_encoder = pickle.load(label_mapping_file)
        
        response = jsonify({"prediction": str(loaded_label_encoder.inverse_transform(prediction)[0])})
        """ decode the encoded label """
        return response

    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 500


# create a api request for dynamic route '/api/crop_details/${crop_id}'
@app.route("/api/crop_details/<string:crop_id>/update", methods=["GET"])
def crop_details(crop_id):
    
    """ convert crop_id to ObjectId """
    object_id = ObjectId(crop_id)
    
    try:
        """Fetches details of a particular crop."""
        crop = Crops.find_one({"_id": object_id})
        # extract data from crop
        start_date = crop["startDate"]
        flag = "lastIrrigation" in crop
        
        
        location = crop["location"]
        longitude = location["longitude"]
        latitude = location["latitude"]
        # print(last_update)
        
        # get previous day
        now = datetime.datetime.now()
        one_day = datetime.timedelta(days=1)
        prev_day = now - one_day
        # print(prev_day)
        
        diff = 0
        if flag == True:
            last_irrigation = crop["lastIrrigation"]
            diff = (last_irrigation-start_date).days
            start_date = last_irrigation + one_day
    
        
        """ Calculating completion date """
        completion_date = start_date + datetime.timedelta(days=crop["period"])
        
        """ check if harvesting completed or not """
        
        if(crop['harvested']==True):
            data ={"$set" :  {"lastUpdate": completion_date, "water": []}}
            result = Crops.find_one_and_update({"_id": object_id}, data)
            # print(result['lastUpdate'])
            return jsonify({"message" : "true"}),200
        
        elif (now - completion_date).days  >= 0:
            data ={"$set" :  {"lastUpdate": completion_date,"lastIrrigation" : None, "water": [] ,"harvested" : True}}
            result = Crops.find_one_and_update({"_id": object_id}, data)
            # print(result['lastUpdate'])
            return jsonify({"message" : "true"}),200
        
        # """ check last updated date """
        elif (now - start_date).days > 0: 
            """ get KC values """
            kc = get_KC(crop["crop"])
            # print(f"KC : {kc}")
            
            """ get et0 values """
            start_date = start_date.strftime("%Y-%m-%d")
            end_date = prev_day.strftime("%Y-%m-%d")
            et0 = get_ET0(latitude, longitude, start_date, end_date)
            # print(f"et0 : {et0}")
            
            
            """ initialize a eempty list for water """
            water = []
            
            # calculate water requirement
            for i in range(len(et0)):
                water.append(kc[i+diff] * et0[i])
                
            """ update the database with new """
            data ={"$set" :  {"lastUpdate": prev_day, "water": water}}
            
            result = Crops.find_one_and_update({"_id": object_id}, data)
            # print(result['lastUpdate'])
        return jsonify({"message" : "true"}),200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(host = "localhost",port= 5000,debug=True)
