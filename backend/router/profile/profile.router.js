import express from "express";
import { verifyCookie } from "../../utils/cookie/verifyCookie/verify.cookie.js";
import { verifyCookieCredentials } from "../../utils/cookie/verifyDataCredentials/verify.cookie.credentials.js";
import {
  createProfileMiddleware,
  updateProfileMiddleware,
} from "../../middleware/profile/profile.middleware.js";
import {
  addOrUpdateProfilePictureController,
  createProfileController,
  deleteProfilePictureController,
  getMyProfileController,
  updateProfileController,
} from "../../controller/profile/profile.controller.js";
import { profileUpload } from "../../multer/profile.upload.js";

const profileRouter = express.Router();

profileRouter
  .route("/create-profile")
  .post(
    verifyCookie,
    verifyCookieCredentials,
    createProfileMiddleware,
    createProfileController,
  );
profileRouter
  .route("/my-profile")
  .get(verifyCookie, verifyCookieCredentials, getMyProfileController);
profileRouter
  .route("/update-profile")
  .put(
    verifyCookie,
    verifyCookieCredentials,
    updateProfileMiddleware,
    updateProfileController,
  );
profileRouter
  .route("/add-update-profile")
  .post(
    verifyCookie,
    verifyCookieCredentials,
    profileUpload.single("image"),
    addOrUpdateProfilePictureController,
  );
profileRouter
  .route("/delete-profile")
  .delete(
    verifyCookie,
    verifyCookieCredentials,
    deleteProfilePictureController,
  );

export default profileRouter;
