import {
  internalServerErrorResponse,
  unauthorizedResponse,
  forbiddenResponse,
} from "../../sendResponse/response.handler.js";

export const verifyUser = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      return unauthorizedResponse(res, "Unauthorized - No user found");
    }

    if (user.role !== "USER") {
      return forbiddenResponse(res, "Access denied");
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
