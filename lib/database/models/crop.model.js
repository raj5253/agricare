import { Schema, model, models } from "mongoose";

const CropSchema = new Schema({
  userId: { type: String, require: true }, // Reference to User model
  cropId: { type: String, required: true }, //given by user
  crop: { type: String, required: true },
  startDate: { type: Date, default: Date.now },
  lastUpdate: { type: Date, default: Date.now },
  lastIrrigation: { type: Date },
  endDate: { type: Date },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  area: { type: Number, required: true },
  period: { type: Number, required: true },
  water: { type: [Number], default: Array(90).fill(0) },
  e_yield: { type: Number },
  yield: { type: Number },
  harvested: { type: Boolean, default: false },
});
const Crop = models.Crop || model("Crop", CropSchema);

export default Crop;
