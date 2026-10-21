import redisClient from "../../config/redis/redis.connect.js";

/**
 * Dynamically check OTP rate limit.
 * Supports:
 * - checkOTPLimit(email) -> default purpose "daily", limit 5
 * - checkOTPLimit(email, "forgot_password")
 * - checkOTPLimit(email, "forgot_password", 3)
 * - checkOTPLimit("forgot_password", email, 3)
 *
 * @param {string} email - User email or purpose
 * @param {string} [purpose="daily"] - OTP flow purpose
 * @param {number} [maxLimit=5] - Maximum allowed OTPs
 * @returns {Promise<boolean>} - true if allowed, false if limit reached
 */
export const checkOTPLimit = async (email, purpose = "daily", maxLimit = 5) => {
  let finalEmail = email;
  let finalPurpose = purpose;
  let finalLimit = maxLimit;

  // Handle flexible signature checkOTPLimit(purpose, email, maxLimit)
  if (
    typeof email === "string" &&
    !email.includes("@") &&
    typeof purpose === "string" &&
    purpose.includes("@")
  ) {
    finalPurpose = email;
    finalEmail = purpose;
  }

  const key =
    finalPurpose === "daily"
      ? `otp:daily:${finalEmail}`
      : `otp:limit:${finalPurpose}:${finalEmail}`;

  const count = await redisClient.get(key);

  if (count && Number(count) >= finalLimit) {
    return false;
  }

  return true;
};
