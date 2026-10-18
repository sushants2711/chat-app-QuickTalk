import joi from "joi";

export const otpSchemaValidation = joi
  .string()
  .length(6)
  .trim()
  .required()
  .messages({
    "string.empty": "OTP is required",
    "string.length": "OTP must be 6 digits",
    "any.required": "OTP is required",
  });
