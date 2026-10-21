import redisClient from "../../config/redis/redis.connect.js";

/**
 * Dynamically increment OTP generation count for rate limiting.
 * Supports:
 * - increaseOTPCount(email) -> default purpose "daily", 24h window
 * - increaseOTPCount(email, "forgot_password")
 * - increaseOTPCount(email, "forgot_password", 3600)
 * - increaseOTPCount("forgot_password", email, 3600)
 *
 * @param {string} email - User email or purpose
 * @param {string} [purpose="daily"] - OTP flow purpose
 * @param {number} [windowInSeconds=86400] - Window duration in seconds (defaults to 24 hours)
 * @returns {Promise<number>} - New count
 */
export const increaseOTPCount = async (
  email,
  purpose = "daily",
  windowInSeconds = 24 * 60 * 60,
) => {
  let finalEmail = email;
  let finalPurpose = purpose;
  let finalWindow = windowInSeconds;

  // Handle flexible signature increaseOTPCount(purpose, email, windowInSeconds)
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

  const count = await redisClient.incr(key);

  // Set TTL when key is first created
  if (count === 1) {
    await redisClient.expire(key, finalWindow);
  }

  return count;
};
