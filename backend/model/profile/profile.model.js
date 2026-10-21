import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: 3,
      maxlength: 30,
    },
    gender: {
      type: String,
      enum: ["M", "F", "O"],
    },
    bio: {
      type: String,
      trim: true,
      maxlength: 200,
    },
    profilePictureUrl: {
      type: String,
      default: "",
    },
    profilePictureId: {
      type: String,
      default: null,
    },
    dob: {
      type: Date,
    },
    city: {
      type: String,
      default: "",
    },
    state: {
      type: String,
      default: "",
    },
    country: {
      type: String,
      default: "",
    },
  },
  { timestamps: true, minimize: true },
);

export default mongoose.models.Profile ||
  mongoose.model("Profile", profileSchema);
