import joi from "joi";
import {
  internalServerErrorResponse,
  validationErrorResponse,
} from "../../utils/sendResponse/response.handler.js";
import { usernameSchemaValidation } from "../../schemaValidation/username/username.validation.js";
import { genderSchemaValidation } from "../../schemaValidation/gender/gender.validation.js";
import { bioSchemaValidation } from "../../schemaValidation/bio/bio.validation.js";
import { dobSchemaValidation } from "../../schemaValidation/dob/dob.validation.js";

export const createProfileMiddleware = async (req, res, next) => {
  try {
    const schema = joi.object({
      username: usernameSchemaValidation,
      gender: genderSchemaValidation,
      bio: bioSchemaValidation,
      dob: dobSchemaValidation,
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
