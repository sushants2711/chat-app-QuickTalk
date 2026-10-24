import joi from "joi";

export const bioSchemaValidation = joi
  .string()
  .min(5)
  .max(200)
  .trim(true)
  .optional()
  .empty("")
  .messages({
    "string.min": "Bio must be at least 5 characters",
    "string.max": "Bio cannot exceed 200 characters",
  });
