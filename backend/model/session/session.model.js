import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    ip: {
      type: String,
      default: null,
    },
    country: {
      type: String,
      default: null,
    },
    device: {
      type: String,
      default: null,
    },
    os: {
      type: String,
      default: null,
    },
    browser: {
      type: String,
      default: null,
    },
  },
  { timestamps: true, minimize: true },
);

export default mongoose.models.Session ||
  mongoose.model("Session", sessionSchema);
