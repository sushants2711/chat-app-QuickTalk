import userModel from "../../model/authentication/user.model.js";
import { TOKEN_NAME } from "../../config/constantData/constant.js";
import { sendSignupVerificationEmail } from "../../email/authentication/sendEmail/send.email.js";
import { checkOTPLimit } from "../../redis/authentication/check.otp.limit.js";
import { storeOTP } from "../../redis/authentication/check.store.otp.js";
import { increaseOTPCount } from "../../redis/authentication/increase.otp.limit.js";
import { sendCookieToUser } from "../../utils/cookie/sendCookie/send.cookie.js";
import { generateOTP } from "../../utils/otp/otp.generator.js";
import { verifyPassword } from "../../utils/password/comparePassword/compare.password.js";
import { hashPassword } from "../../utils/password/hashedPassword/hash.password.js";
import {
  badRequestResponse,
  createdResponse,
  internalServerErrorResponse,
  successResponse,
} from "../../utils/sendResponse/response.handler.js";
import { saveOrUpdateSignupSession } from "../session/session.controller.js";

// @desc: Register a new user
// @route: POST /api/v1/user/signup
// @access: Public

export const signupController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExist = await userModel.findOne({ email });

    // if user exist and it is verified then return
    if (userExist) {
      // if user exist and it is verified
      if (userExist.isVerified) {
        return badRequestResponse(res, "User Already Exists");
      }

      // if user exist and it is blocked
      if (userExist.accountBlock) {
        return badRequestResponse(
          res,
          "Your Account Has Been Blocked, please contact to admin",
        );
      }

      // if user exist and it is deleted
      if (userExist.isDeleted) {
        return badRequestResponse(
          res,
          "Your Account Has Been Deleted, please restore it first",
        );
      }

      // if user exist but it is not verified
      if (!userExist.isVerified) {
        // check the limit first
        const otpLimitCheck = await checkOTPLimit(email);

        if (!otpLimitCheck) {
          return badRequestResponse(
            res,
            "OTP generation limit reached. Try again later",
          );
        }

        // if the name is different then update it
        if (userExist.name !== name) {
          userExist.name = name;
        }

        // now compare the password
        const isPasswordMatch = await verifyPassword(
          password,
          userExist.password,
        );

        // if the password is different then update it
        if (!isPasswordMatch) {
          const hashThepassword = await hashPassword(password);
          userExist.password = hashThepassword;
        }

        const otp = generateOTP();

        const savedExistingUser = await userExist.save();

        // Record or update session data for existing unverified user
        await saveOrUpdateSignupSession(savedExistingUser._id, req);

        // store OTP for 5 minutes
        await storeOTP(email, otp);

        // increase the OTP count
        await increaseOTPCount(email);

        // now send a email to user
        try {
          await sendSignupVerificationEmail(
            savedExistingUser.name,
            savedExistingUser.email,
            otp,
          );
        } catch (error) {
          return internalServerErrorResponse(
            res,
            "Failed to send a otp",
            error?.message,
          );
        }

        const dataSendToClient = savedExistingUser.toObject();

        delete dataSendToClient.password;

        // now send a cookie to the user

        try {
          const token = await sendCookieToUser(dataSendToClient._id, res);

          dataSendToClient[TOKEN_NAME] = token;
        } catch (error) {
          return internalServerErrorResponse(
            res,
            "Failed to send cookie",
            error?.message,
          );
        }

        // return a success message to the user
        return successResponse(
          res,
          "OTP sent to your email address successfully",
          dataSendToClient,
        );
      }
    }

    // if the user is totally fresh than send a fresh email and everything

    const hashedThePassword = await hashPassword(password);

    const otp = generateOTP();

    const newUser = new userModel({
      name,
      email,
      password: hashedThePassword,
    });

    const savedNewUser = await newUser.save();

    if (!savedNewUser) {
      return badRequestResponse(res, "Error Occured While Signing Up");
    }

    // Record session data for brand new user
    await saveOrUpdateSignupSession(savedNewUser._id, req);

    // store OTP for 5 minutes
    await storeOTP(email, otp);

    // increase the OTP count
    await increaseOTPCount(email);

    // now send an otp to the user email
    try {
      await sendSignupVerificationEmail(name, email, otp);
    } catch (error) {
      return internalServerErrorResponse(
        res,
        "Failed to send a otp",
        error?.message,
      );
    }

    const dataSendToClient = savedNewUser.toObject();

    delete dataSendToClient.password;

    // send a cookie to the user

    try {
      const token = await sendCookieToUser(dataSendToClient._id, res);

      dataSendToClient[TOKEN_NAME] = token;
    } catch (error) {
      return internalServerErrorResponse(
        res,
        "Failed to send cookie",
        error?.message,
      );
    }

    // return a success message to the user
    return createdResponse(
      res,
      "OTP sent to your email address successfully",
      dataSendToClient,
    );
  } catch (error) {
    return internalServerErrorResponse(
      res,
      "Internal Server Error",
      error?.message,
    );
  }
};

// @desc: Login a user
// @route: POST /api/v1/user/login
// @access: Public

// @desc: verify user otp
// @route: POST /api/v1/user/verify-otp
// @access: Public

// @desc: Logout a user
// @route: POST /api/v1/user/logout
// @access: Private

// @desc: Get current user
// @route: GET /api/v1/user/current-user
// @access: Private

// @desc: forgot user password
// @route: POST /api/v1/user/forgot-password
// @access: Public

// @desc: reset user password
// @route: PUT /api/v1/user/reset-password
// @access: Private
