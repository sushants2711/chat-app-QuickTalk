import express from "express";
import { verifyCookie } from "../../utils/cookie/verifyCookie/verify.cookie.js";
import { verifyAdmin } from "../../utils/cookie/verifyAdmin/verify.cookie.admin.js";
import {
  getAllSessionController,
  getSessionAggregateController,
} from "../../controller/session/session.controller.js";
import { verifyCookieCredentials } from "../../utils/cookie/verifyDataCredentials/verify.cookie.credentials.js";

const sessionRouter = express.Router();

sessionRouter
  .route("/all-session")
  .get(
    verifyCookie,
    verifyCookieCredentials,
    verifyAdmin,
    getAllSessionController,
  );

sessionRouter
  .route("/session-aggregated")
  .get(
    verifyCookie,
    verifyCookieCredentials,
    verifyAdmin,
    getSessionAggregateController,
  );

export default sessionRouter;
