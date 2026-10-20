import sessionModel from "../../model/session/session.model.js";
import {
  badRequestResponse,
  internalServerErrorResponse,
  successResponse,
} from "../../utils/sendResponse/response.handler.js";

// desc - get all session of user
// route - GET api/v1/session/all-session
// access - private

export const getAllSessionController = async (req, res) => {
  try {
    const { device, country, os, browser } = req.query;

    const query = {};

    if (device) {
      query.device = { $regex: device, $options: "i" };
    }

    if (country) {
      query.country = { $regex: country, $options: "i" };
    }

    if (os) {
      query.os = { $regex: os, $options: "i" };
    }

    if (browser) {
      query.browser = { $regex: browser, $options: "i" };
    }

    const allSession = await sessionModel
      .find(query)
      .populate("userId", "name email role isVerified lastLogin createdAt");

    if (!allSession || allSession.length === 0 || !Array.isArray(allSession)) {
      return badRequestResponse(res, "No Data found");
    }

    return successResponse(res, "All Session Fetched Successfully", allSession);
  } catch (error) {
    return internalServerErrorResponse(
      res,
      "Internal Server Error",
      error?.message,
    );
  }
};

// desc - get all user session group by country
// route - GET api/v1/session/session-aggregate
// access - private

export const getSessionAggregateController = async (req, res) => {
  try {
    const allCountryCount = await sessionModel.aggregate([
      {
        $group: {
          _id: "$country",
          count: { $sum: 1 },
        },
      },
    ]);

    const allOsCount = await sessionModel.aggregate([
      {
        $group: {
          _id: "$os",
          count: { $sum: 1 },
        },
      },
    ]);

    const allDeviceCount = await sessionModel.aggregate([
      {
        $group: {
          _id: "$device",
          count: { $sum: 1 },
        },
      },
    ]);

    const allBrowserCount = await sessionModel.aggregate([
      {
        $group: {
          _id: "$browser",
          count: { $sum: 1 },
        },
      },
    ]);

    const sessionData = {
      allCountryCount,
      allOsCount,
      allDeviceCount,
      allBrowserCount,
    };

    return successResponse(res, "data fetch successfully", sessionData);
  } catch (error) {
    return internalServerErrorResponse(
      res,
      "Internal Server Error",
      error?.message,
    );
  }
};
