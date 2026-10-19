import express from "express";
import { signupMiddleware } from "../../middleware/authentication/user.middleware.js";
import { signupController } from "../../controller/authentication/user.controller.js";

const userRouter = express.Router();

// @desc: register a new user
// @route: POST /api/v1/user/signup
// @access: public
userRouter.route("/signup").post(signupMiddleware, signupController);

export default userRouter;
