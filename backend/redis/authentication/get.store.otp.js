import redisClient from "../../config/redis/redis.connect.js";

/**
 * Dynamically fetch stored OTP from Redis.
 * Supports:
 * - getStoredOTP(email) -> default purpose "verify"
 * - getStoredOTP(email, "forgot_password")
 * - getStoredOTP("forgot_password", email)
 *
 * @param {string} email - User email or purpose
 * @param {string} [purpose="verify"] - OTP flow purpose
 * @returns {Promise<string|null>}
 */
export const getStoredOTP = async (email, purpose = "verify") => {
  let finalEmail = email;
  let finalPurpose = purpose;

  // Handle flexible signature getStoredOTP(purpose, email)
  if (
    typeof email === "string" &&
    !email.includes("@") &&
    typeof purpose === "string" &&
    purpose.includes("@")
  ) {
    finalPurpose = email;
    finalEmail = purpose;
  }

  const otpKey = `otp:${finalPurpose}:${finalEmail}`;
  return await redisClient.get(otpKey);
};
