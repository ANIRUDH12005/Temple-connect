import mongoose from "mongoose";

const festivalSchema = new mongoose.Schema({
  name: String,
  date: String,
  description: String,
});

const ritualSchema = new mongoose.Schema({
  name: String,
  time: String,
  description: String,
});

const templeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    deity: {
      type: String,
      required: true,
      trim: true,
    },
    history: String,
    darshanTimings: String,
    rituals: [ritualSchema],
    festivals: [festivalSchema],
    visitorInfo: {
      dressCode: String,
      guidelines: String,
      facilities: [String],
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [lng, lat]
        required: true,
      },
      lat: Number, // Keeping these for explicit storage as well if needed
      lng: Number,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Indexes
templeSchema.index({ name: "text", city: "text", deity: "text" });
templeSchema.index({ location: "2dsphere" });
templeSchema.index({ createdAt: -1 });

const Temple = mongoose.model("Temple", templeSchema);

export default Temple;