import express from "express";
import {
  loginMiddleware,
  otpMiddleware,
  signupMiddleware,
} from "../../middleware/authentication/user.middleware.js";
import {
  loginController,
  otpController,
  signupController,
} from "../../controller/authentication/user.controller.js";
import { verifyCookie } from "../../utils/cookie/verifyCookie/verify.cookie.js";

const userRouter = express.Router();

userRouter.route("/signup").post(signupMiddleware, signupController);
userRouter.route("/login").post(loginMiddleware, loginController);
userRouter.route("/otp").post(verifyCookie, otpMiddleware, otpController);

export default userRouter;
