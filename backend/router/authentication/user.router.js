import express from "express";
import {
  changePasswordMiddleware,
  deleteAccountRequestMiddleware,
  deleteAccountSuccessMiddleware,
  forgotPasswordMiddleware,
  loginMiddleware,
  otpMiddleware,
  resetPasswordMiddleware,
  signupMiddleware,
} from "../../middleware/authentication/user.middleware.js";
import {
  changePasswordController,
  deleteAccountRequestController,
  deleteAccountSuccessController,
  forgotPasswordController,
  getCurrentUserController,
  loginController,
  logoutController,
  otpController,
  resetPasswordController,
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
userRouter
  .route("/change-password")
  .put(
    verifyCookie,
    verifyCookieCredentials,
    changePasswordMiddleware,
    changePasswordController,
  );
userRouter
  .route("/forgot-password")
  .put(forgotPasswordMiddleware, forgotPasswordController);
userRouter
  .route("/reset-password")
  .put(
    verifyCookie,
    verifyCookieCredentials,
    resetPasswordMiddleware,
    resetPasswordController,
  );
userRouter
  .route("/delete-account")
  .put(
    verifyCookie,
    verifyCookieCredentials,
    deleteAccountRequestMiddleware,
    deleteAccountRequestController,
  );
userRouter
  .route("/delete-account-success")
  .put(
    verifyCookie,
    verifyCookieCredentials,
    deleteAccountSuccessMiddleware,
    deleteAccountSuccessController,
  );

export default userRouter;
