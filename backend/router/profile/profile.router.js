import express from "express";
import { verifyCookie } from "../../utils/cookie/verifyCookie/verify.cookie.js";
import { verifyCookieCredentials } from "../../utils/cookie/verifyDataCredentials/verify.cookie.credentials.js";
import {
  createProfileMiddleware,
  updateProfileMiddleware,
} from "../../middleware/profile/profile.middleware.js";
import {
  createProfileController,
  getMyProfileController,
  updateProfileController,
} from "../../controller/profile/profile.controller.js";

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
  .route("/update-profile/:id")
  .put(
    verifyCookie,
    verifyCookieCredentials,
    updateProfileMiddleware,
    updateProfileController,
  );

export default profileRouter;
