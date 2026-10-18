import joi from "joi";

export const passwordSchemaValidation = joi
  .string()
  .min(8)
  .max(100)
  .required()
  .messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 8 characters",
    "string.max": "Password cannot exceed 100 characters",
    "any.required": "Password is required",
  });
