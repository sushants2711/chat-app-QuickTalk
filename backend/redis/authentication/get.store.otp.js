import redisClient from "../../config/redis/redis.connect.js";

export const getStoredOTP = async (email) => {
  const otpKey = `otp:verify:${email}`;
  return await redisClient.get(otpKey);
};
