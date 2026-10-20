import geoip from "geoip-lite";
import { UAParser } from "ua-parser-js";
import { logger } from "../../config/logger/logger.config.js";

/**
 * Extract client IP address safely considering proxies and IPv6
 * @param {import("express").Request} req
 * @returns {string}
 */
const getClientIp = (req) => {
  const forwarded = req.headers["x-forwarded-for"];
  if (forwarded) {
    const firstIp = forwarded.split(",")[0].trim();
    return firstIp.replace(/^::ffff:/, "");
  }
  const ip = req.ip || req.socket?.remoteAddress || "Unknown";
  return ip.replace(/^::ffff:/, "");
};

/**
 * Express middleware to track HTTP requests with IP, Country, Device, OS, status, response time, and response message
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export const requestLogger = (req, res, next) => {
  const startTime = Date.now();
  const clientIp = getClientIp(req);

  // 1. Country from IP using geoip-lite
  const geo = geoip.lookup(clientIp);
  const country =
    geo?.country ||
    (clientIp === "127.0.0.1" || clientIp === "::1" ? "Local" : "Unknown");

  // 2. OS, Device, and Browser from User-Agent
  const parser = new UAParser(req.headers["user-agent"] || "");
  const os = parser.getOS().name || "Unknown";
  const device = parser.getDevice().type || "desktop";
  const browser = parser.getBrowser().name || "Unknown";

  // Attach client info to req object so downstream controllers can use it directly
  req.clientInfo = {
    ip: clientIp,
    country,
    device,
    os,
    browser,
  };

  // 3. Capture response message from res.json()
  let responseMessage = null;
  const originalJson = res.json;
  res.json = function (body) {
    if (body && typeof body === "object" && body.message) {
      responseMessage = body.message;
    }
    return originalJson.apply(this, arguments);
  };

  res.on("finish", () => {
    const duration = Date.now() - startTime;
    const responseTime = `${duration}ms`;

    const messageWithDetails = responseMessage
      ? `${req.method} ${req.originalUrl || req.url} - ${res.statusCode} (${responseTime}) - "${responseMessage}"`
      : `${req.method} ${req.originalUrl || req.url} - ${res.statusCode} (${responseTime})`;

    const logEntry = {
      message: messageWithDetails,
      ip: clientIp,
      country,
      device,
      os,
      statusCode: res.statusCode,
      responseTime,
    };

    if (res.statusCode >= 500) {
      logger.error(logEntry);
    } else if (res.statusCode >= 400) {
      logger.warn(logEntry);
    } else {
      logger.info(logEntry);
    }
  });

  next();
};

export default requestLogger;
