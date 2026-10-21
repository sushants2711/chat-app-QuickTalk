import express from "express";
import {
  changePasswordMiddleware,
  deleteAccountRequestMiddleware,
  forgotPasswordMiddleware,
  loginMiddleware,
  otpMiddleware,
  resetPasswordMiddleware,
  signupMiddleware,
} from "../../middleware/authentication/user.middleware.js";
import {
  adminSignupController,
  changePasswordController,
  deleteAccountRequestController,
  deleteAccountSuccessController,
  forgotPasswordController,
  getCurrentUserController,
  loginController,
  logoutController,
  otpController,
  resetPasswordController,
  restoreAccountRequestController,
  restoreAccountSuccessController,
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
    otpMiddleware,
    deleteAccountSuccessController,
  );
userRouter
  .route("/restore-account")
  .put(forgotPasswordMiddleware, restoreAccountRequestController);
userRouter
  .route("/restore-account-success")
  .put(verifyCookie, otpMiddleware, restoreAccountSuccessController);

userRouter.route("/admin-signup").post(signupMiddleware, adminSignupController);

export default userRouter;
