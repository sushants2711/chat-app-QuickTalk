import multer from "multer";
import { profileStorage } from "../config/cloudinary/profile.storage.js";

export const profileUpload = multer({
  storage: profileStorage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});
