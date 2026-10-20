import { COOKIE_MAX_AGE, NODE_ENV } from "../config/constant.js";

export const cookieOptionsSetting = {
  maxAge: Number(COOKIE_MAX_AGE),
  httpOnly: true,
  sameSite: NODE_ENV === "development" ? "lax" : "none",
  secure: NODE_ENV !== "development",
};
