import joi from "joi";

export const emailSchemaValidation = joi.string()
    .email()
    .min(10)
    .max(30)
    .trim(true)
    .required()
    .messages({
        "string.email": "Invalid email address",
        "string.empty": "Email is required",
        "string.min": "Email must be at least 10 characters",
        "string.max": "Email cannot exceed 30 characters",
        "any.required": "Email is required"
    })