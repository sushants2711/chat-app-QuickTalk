import mongoose from "mongoose";
import { badRequestResponse } from "../sendResponse/response.handler.js";

export const verifyMongoDbId = (id, res) => {
  if (!id) {
    return badRequestResponse(res, "Id is missing");
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return badRequestResponse(res, "Invalid Id");
  }

  return true;
};
