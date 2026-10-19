import jwt from "jsonwebtoken";
import {
  JWT_TOKEN,
  JWT_EXPIRES_IN,
} from "../../../config/constantData/constant.js";

export const generateToken = (userId) => {
  const token = jwt.sign({ userId }, JWT_TOKEN, { expiresIn: JWT_EXPIRES_IN });
  return token;
};
