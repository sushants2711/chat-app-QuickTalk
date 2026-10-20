import express from "express";
import {
  loginMiddleware,
  otpMiddleware,
  signupMiddleware,
} from "../../middleware/authentication/user.middleware.js";
import {
  getCurrentUserController,
  loginController,
  logoutController,
  otpController,
  signupController,
} from "../../controller/authentication/user.controller.js";
import { verifyCookie } from "../../utils/cookie/verifyCookie/verify.cookie.js";
import { verifyCookieCredentials } from "../../utils/cookie/verifyDataCredentials/verify.cookie.credentials.js";

const userRouter = express.Router();

userRouter.route("/signup").post(signupMiddleware, signupController);
userRouter.route("/login").post(loginMiddleware, loginController);
userRouter.route("/otp").post(verifyCookie, otpMiddleware, otpController);
userRouter
  .route("/logout")
  .post(verifyCookie, verifyCookieCredentials, logoutController);
userRouter
  .route("/current-user")
  .get(verifyCookie, verifyCookieCredentials, getCurrentUserController);

export default userRouter;
