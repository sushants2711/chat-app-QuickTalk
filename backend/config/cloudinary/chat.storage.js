import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.config.js";

export const chatStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "quick_chat/chats",
    format: async (req, file) => file.originalname.split(".").pop(),
    public_id: (req, file) => file.fieldname + "-" + Date.now(),
    transformation: [{ quality: "auto:best" }],
  },
});
