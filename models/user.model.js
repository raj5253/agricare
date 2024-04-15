import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  photo: { type: String, required: true },
  phone: { type: String },
  crops: [
    {
      crop_id: { type: String, required: true }, //given by user
      crop_name: { type: String, required: true },
      start_date: { type: Date, default: Date.now },
      end_date: { type: Date },
      location: { longitude: { type: Number }, latitude: { type: Number } },
      area: { type: Number, required: true },
      soil_chemical: {
        N: { type: Number, required: true },
        P: { type: Number, required: true },
        K: { type: Number, required: true },
      },
      water: { type: [Number], default: Array(90).fill(0) },
      humidity: { type: [Number], default: Array(90).fill(0) },
      e_yield: { type: Number },
      yield: { type: Number },
    },
  ],
});
const User = models.User || model("User", UserSchema);

export default User;

/*
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      // Now you can send this latitude and longitude to your backend to store it in the database
    },
    function(error) {
      console.error('Error getting user location:', error);
    }
  );
} else {
  console.error('Geolocation is not supported by this browser');
}

*/
