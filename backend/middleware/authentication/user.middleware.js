import joi from "joi";
import {
  badRequestResponse,
  internalServerErrorResponse,
  validationErrorResponse,
} from "../../utils/sendResponse/response.handler.js";
import { nameSchemaValidation } from "../../schemaValidation/name/name.validation.js";
import { emailSchemaValidation } from "../../schemaValidation/email/email.validation.js";
import { passwordSchemaValidation } from "../../schemaValidation/password/password.validation.js";
import { otpSchemaValidation } from "../../schemaValidation/otp/otp.validation.js";

export const signupMiddleware = async (req, res, next) => {
  try {
    const schema = joi.object({
      name: nameSchemaValidation,
      email: emailSchemaValidation,
      password: passwordSchemaValidation,
      confirmPassword: passwordSchemaValidation,
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return validationErrorResponse(res, error?.details?.[0]?.message);
    }

    if (req.body.password !== req.body.confirmPassword) {
      return badRequestResponse(res, "Password mismatch");
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

export const resetPasswordMiddleware = async (req, res, next) => {
  try {
    const schema = joi.object({
      otp: otpSchemaValidation,
      password: passwordSchemaValidation,
      confirmPassword: passwordSchemaValidation,
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return validationErrorResponse(res, error?.details?.[0]?.message);
    }

    if (req.body.password !== req.body.confirmPassword) {
      return badRequestResponse(res, "Password mismatch");
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

export const changePasswordMiddleware = async (req, res, next) => {
  try {
    const schema = joi.object({
      currentPassword: passwordSchemaValidation,
      newPassword: passwordSchemaValidation,
      confirmPassword: passwordSchemaValidation,
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return validationErrorResponse(res, error?.details?.[0]?.message);
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
      return badRequestResponse(res, "Password mismatch");
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

export const deleteAccountRequestMiddleware = async (req, res, next) => {
  try {
    const schema = joi.object({
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
