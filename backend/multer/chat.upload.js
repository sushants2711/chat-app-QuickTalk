import multer from "multer";
import { chatStorage } from "../config/cloudinary/chat.storage.js";

export const chatUpload = multer({
  storage: chatStorage,
  limits: {
    fileSize: 30 * 1024 * 1024,
  },
});
