import { COOKIE_NAME } from "../../../config/constantData/constant.js";
import { internalServerErrorResponse } from "../../sendResponse/response.handler.js";
import { generateToken } from "../../token/jwt.token.js";
import { cookieOptionsSetting } from "../cookieConf/cookie.option.js";

export const sendCookieToUser = async (userId, res) => {
  try {
    const token = generateToken(userId);

    res.cookie(COOKIE_NAME, token, cookieOptionsSetting);

    return token;
  } catch (error) {
    return internalServerErrorResponse(
      res,
      "Internal Server Error",
      error?.message,
    );
  }
};
