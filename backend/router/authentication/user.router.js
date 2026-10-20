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

const userRouter = express.Router();

// @desc: register a new user
// @route: POST /api/v1/user/signup
// @access: public

userRouter.route("/signup").post(signupMiddleware, signupController);
userRouter.route("/login").post(loginMiddleware, loginController);
userRouter.route("/otp").post(otpMiddleware, otpController);

export default userRouter;
