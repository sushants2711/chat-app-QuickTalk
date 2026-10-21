import redisClient from "../../config/redis/redis.connect.js";
import { OTP_EXPIRY_MINUTES } from "../../config/constantData/constant.js";

const DEFAULT_EXPIRY = (Number(OTP_EXPIRY_MINUTES) || 5) * 60;

/**
 * Dynamically store an OTP in Redis.
 * Supports:
 * - storeOTP(email, otp) -> default purpose "verify", 5 min TTL
 * - storeOTP(email, otp, "forgot_password")
 * - storeOTP(email, otp, "forgot_password", 10 * 60)
 * - storeOTP("forgot_password", email, otp, 10 * 60)
 *
 * @param {string} email - User email or purpose
 * @param {string} otp - OTP code or email
 * @param {string} [purpose="verify"] - OTP flow purpose (e.g. "verify", "forgot_password", "reset_password")
 * @param {number} [expiryInSeconds] - Expiration in seconds (default: OTP_EXPIRY_MINUTES or 300s)
 */
export const storeOTP = async (
  email,
  otp,
  purpose = "verify",
  expiryInSeconds = DEFAULT_EXPIRY,
) => {
  let finalEmail = email;
  let finalOtp = otp;
  let finalPurpose = purpose;
  let finalExpiry = expiryInSeconds;

  // Handle flexible signature storeOTP(purpose, email, otp, expiry)
  if (
    typeof email === "string" &&
    !email.includes("@") &&
    typeof otp === "string" &&
    otp.includes("@")
  ) {
    finalPurpose = email;
    finalEmail = otp;
    finalOtp = purpose;
    finalExpiry =
      typeof expiryInSeconds === "number" ? expiryInSeconds : DEFAULT_EXPIRY;
  }

  const otpKey = `otp:${finalPurpose}:${finalEmail}`;

  await redisClient.set(otpKey, finalOtp, {
    EX: finalExpiry,
  });

  return true;
};
