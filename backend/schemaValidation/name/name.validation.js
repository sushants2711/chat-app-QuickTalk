import joi from "joi";

export const nameSchemaValidation = joi.string()
    .min(6)
    .max(30)
    .trim(true)
    .pattern(/^[A-Za-z ]+$/)
    .required()
    .messages({
        "string.empty": "Name is required",
        "string.min": "Name must be at least 6 characters",
        "string.max": "Name cannot exceed 30 characters",
        "string.pattern.base": "Name can contain only letters and spaces",
        "any.required": "Name is required"
    });