import joi from "joi";
import {
  badRequestResponse,
  internalServerErrorResponse,
  validationErrorResponse,
} from "../../utils/sendResponse/response.handler.js";
import { nameSchemaValidation } from "../../schemaValidation/name/name.validation";
import { emailSchemaValidation } from "../../schemaValidation/email/email.validation.js";
import { passwordSchemaValidation } from "../../schemaValidation/password/password.validation.js";
import { otpSchemaValidation } from "../../schemaValidation/otp/otp.validation.js";

// @desc - signup validation middleware
// @route - POST /api/v1/user/signup
// @access - public
export const signupMiddleware = async (req, res, next) => {
  try {
    const schema = joi.object({
      name: nameSchemaValidation,
      email: emailSchemaValidation,
      password: passwordSchemaValidation,
      confirmPassword: passwordSchemaValidation,
    });

    if (req.body.password !== req.body.confirmPassword) {
      return badRequestResponse(res, "Password mismatch");
    }

    const { error } = schema.validate(req.body);

    if (error) {
      return validationErrorResponse(res, error?.details?.[0]?.message);
    }

    next();
  } catch (error) {
    return internalServerErrorResponse(
      res,
      "Internal Server Error",
      error?.message,
    );
  }
};

// desc - login validation middleware
// @route - POST /api/v1/user/login
// @access - public
export const loginMiddleware = async (req, res, next) => {
  try {
    const schema = joi.object({
      email: emailSchemaValidation,
      password: passwordSchemaValidation,
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return validationErrorResponse(res, error?.details?.[0]?.message);
    }

    next();
  } catch (error) {
    return internalServerErrorResponse(
      res,
      "Internal Server Error",
      error?.message,
    );
  }
};

// desc - verify the otp validation middleware
// @route - POST /api/v1/user/verify-user
// @access - public
export const otpMiddleware = async (req, res, next) => {
  try {
    const schema = joi.object({
      otp: otpSchemaValidation,
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return validationErrorResponse(res, error?.details?.[0]?.message);
    }

    next();
  } catch (error) {
    return internalServerErrorResponse(
      res,
      "Internal Server Error",
      error?.message,
    );
  }
};

// desc - forgot password
// @route - POST /api/v1/user/forgot-password
// @access - public
export const forgotPasswordMiddleware = async (req, res, next) => {
  try {
    const schema = joi.object({
      email: emailSchemaValidation,
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return validationErrorResponse(res, error?.details?.[0]?.message);
    }

    next();
  } catch (error) {
    return internalServerErrorResponse(
      res,
      "Internal Server Error",
      error?.message,
    );
  }
};

// desc - reset password
// @route - POST /api/v1/user/reset-password
// @access - public
export const resetPasswordMiddleware = async (req, res, next) => {
  try {
    const schema = joi.object({
      otp: otpSchemaValidation,
      password: passwordSchemaValidation,
      confirmPassword: passwordSchemaValidation,
    });

    if (req.body.password !== req.body.confirmPassword) {
      return badRequestResponse(res, "Password mismatch");
    }

    const { error } = schema.validate(req.body);

    if (error) {
      return validationErrorResponse(res, error?.details?.[0]?.message);
    }

    next();
  } catch (error) {
    return internalServerErrorResponse(
      res,
      "Internal Server Error",
      error?.message,
    );
  }
};
