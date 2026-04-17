import mongoose from "mongoose";

const templeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    deity: {
      type: String,
      required: true,
    },
    history: {
      type: String,
    },
    darshanTimings: {
      type: String,
    },
    festivals: [
      {
        type: String,
      },
    ],
    rules: {
      type: String,
    },
    location: {
      lat: Number,
      lng: Number,
    },
  },
  { timestamps: true }
);

const Temple = mongoose.model("Temple", templeSchema);

export default Temple;