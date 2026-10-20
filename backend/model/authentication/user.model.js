import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    accountBlock: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: String,
      default: null,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, minimize: true },
);

// userSchema.index({ email: 1 });

export default mongoose.models.User || mongoose.model("User", userSchema);
