import winston from "winston";
import { NODE_ENV } from "../constantData/constant.js";

// Structured JSON format for AWS CloudWatch & production log aggregators
const cloudWatchFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
  winston.format.errors({ stack: true }),
  winston.format.json(),
);

// Human-readable colorized format for local development console
const devFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.printf(
    ({
      timestamp,
      level,
      message,
      responseTime,
      ip,
      country,
      device,
      os,
      statusCode,
    }) => {
      const metaParts = [];
      if (ip) metaParts.push(`IP: ${ip}`);
      if (country) metaParts.push(`Country: ${country}`);
      const deviceType = typeof device === "object" ? device?.type : device;
      if (deviceType) metaParts.push(`Device: ${deviceType}`);
      if (os) metaParts.push(`OS: ${os}`);
      if (statusCode) metaParts.push(`Status: ${statusCode}`);
      if (responseTime) metaParts.push(`Time: ${responseTime}`);

      const metaStr = metaParts.length > 0 ? ` [${metaParts.join(" | ")}]` : "";
      return `[${timestamp}] ${level}: ${message}${metaStr}`;
    },
  ),
);

// Create Winston logger instance - streams to stdout (captured automatically by AWS CloudWatch)
export const logger = winston.createLogger({
  level: NODE_ENV === "production" ? "info" : "debug",
  format: NODE_ENV === "production" ? cloudWatchFormat : devFormat,
  transports: [
    new winston.transports.Console({
      format: NODE_ENV === "production" ? cloudWatchFormat : devFormat,
    }),
  ],
  exitOnError: false,
});

export default logger;
