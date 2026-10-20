import jwt from "jsonwebtoken";
import {
  JWT_TOKEN,
  COOKIE_NAME,
} from "../../../config/constantData/constant.js";
import {
  internalServerErrorResponse,
  notFoundResponse,
  unauthorizedResponse,
} from "../../sendResponse/response.handler.js";
import userModel from "../../../model/authentication/user.model.js";

export const verifyCookie = async (req, res, next) => {
  try {
    const cookieToken = req.cookies?.[COOKIE_NAME];

    const headerToken = req.headers.authorization?.startsWith("Bearer ")
      ? req.headers.authorization.split(" ")[1]
      : req.headers.authorization || req.headers["x-auth-token"];

    const token = cookieToken || headerToken;

    if (!token) {
      return unauthorizedResponse(res, "Unauthorized - No token provided");
    }

    const decodeToken = jwt.verify(token, JWT_TOKEN);

    if (!decodeToken || !decodeToken?.userId) {
      return unauthorizedResponse(res, "Invalid Token");
    }

    const user = await userModel
      .findById(decodeToken?.userId)
      .select("-password");

    if (!user) {
      return notFoundResponse(res, "User not found");
    }

    req.user = user;

    next();
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid or expired token" });
    }

    return internalServerErrorResponse(
      res,
      "Internal Server Error",
      error?.message,
    );
  }
};
