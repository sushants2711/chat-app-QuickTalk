import redisClient from "../../config/redis/redis.connect.js";

export const increaseOTPCount = async (email) => {
  const dailyKey = `otp:daily:${email}`;

  const count = await redisClient.incr(dailyKey);

  // Start 24-hour expiry when first OTP is generated
  if (count === 1) {
    await redisClient.expire(dailyKey, 24 * 60 * 60);
  }

  return count;
};
