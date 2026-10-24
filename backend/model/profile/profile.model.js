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
      minlength: 5,
      maxlength: 30,
    },
    gender: {
      type: String,
      enum: ["M", "F", "O"],
      required: true,
    },
    bio: {
      type: String,
      trim: true,
      maxlength: 200,
    },
    profilePictureUrl: {
      type: String,
      default: null,
    },
    profilePictureId: {
      type: String,
      default: null,
    },
    dob: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true, minimize: true },
);

export default mongoose.models.Profile ||
  mongoose.model("Profile", profileSchema);
