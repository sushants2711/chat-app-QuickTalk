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

// desc - save or update signup session
// helper function use at the time of signup to store the user location and etc

export const saveOrUpdateSignupSession = async (userId, req) => {
  try {
    // 1. Read parsed client data that traveled through req.clientInfo
    const { ip, country, device, os, browser } = req.clientInfo || {};

    // 2. Upsert session: create new or update existing unverified user
    await sessionModel.findOneAndUpdate(
      { userId },
      {
        userId,
        ip: ip || null,
        country: country || null,
        device: device || null,
        os: os || null,
        browser: browser || null,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );
  } catch (sessionError) {
    // Non-blocking: Do not interrupt the signup flow if session recording fails
    console.error("Failed to record signup session:", sessionError?.message);
  }
};
