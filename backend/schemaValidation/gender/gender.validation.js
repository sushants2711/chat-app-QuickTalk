import joi from "joi";

export const genderSchemaValidation = joi
  .string()
  .valid("M", "F", "O")
  .required()
  .messages({
    "string.empty": "Gender is required",
    "any.only": "Invalid gender",
    "any.required": "Gender is required",
  });
