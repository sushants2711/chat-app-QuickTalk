import joi from "joi";

export const genderSchemaValidation = joi
  .string()
  .valid("M", "F", "O")
  .messages({
    "any.only": "Invalid gender",
  });
