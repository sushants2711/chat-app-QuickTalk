import redisClient from "../../config/redis/redis.connect.js";

/**
 * Dynamically delete stored OTP from Redis.
 * Supports:
 * - deleteOTP(email) -> default purpose "verify"
 * - deleteOTP(email, "forgot_password")
 * - deleteOTP("forgot_password", email)
 *
 * @param {string} email - User email or purpose
 * @param {string} [purpose="verify"] - OTP flow purpose
 * @returns {Promise<number>}
 */
export const deleteOTP = async (email, purpose = "verify") => {
  let finalEmail = email;
  let finalPurpose = purpose;

  // Handle flexible signature deleteOTP(purpose, email)
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
  return await redisClient.del(otpKey);
};
