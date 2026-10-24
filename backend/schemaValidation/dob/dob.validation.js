import joi from "joi";

export const dobSchemaValidation = joi.date().optional().empty("").messages({
  "date.base": "Invalid date",
});
