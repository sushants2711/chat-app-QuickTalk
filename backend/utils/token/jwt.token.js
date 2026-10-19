import jwt from "jsonwebtoken";
import {
  JWT_EXPIRES_IN,
  JWT_TOKEN,
} from "../../config/constantData/constant.js";

export const generateToken = (userId) => {
  const token = jwt.sign({ userId }, JWT_TOKEN, { expiresIn: JWT_EXPIRES_IN });
  return token;
};
