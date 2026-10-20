import {
  internalServerErrorResponse,
  notFoundResponse,
} from "../../sendResponse/response.handler.js";

export const verifyCookieCredentials = async (req, res, next) => {
  const user = req.user;

  try {
    if (!user) {
      return notFoundResponse(res, "User not found");
    }

    if (!user.isVerified) {
      return notFoundResponse(res, "User is not verified");
    }

    if (user.accountBlock) {
      return notFoundResponse(res, "User account is blocked");
    }

    if (user.isDeleted) {
      return notFoundResponse(res, "User is deleted");
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
