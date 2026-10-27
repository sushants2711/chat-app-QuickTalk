import joi from "joi";

export const usernameSchemaValidation = joi
  .string()
  .min(5)
  .max(30)
  .trim()
  .pattern(/^(?=.*[A-Za-z]).+$/)
  .messages({
    "string.min": "Username must be at least 5 characters",
    "string.max": "Username cannot exceed 30 characters",
    "string.pattern.base":
      "Username must contain at least one alphabetic character",
  });
