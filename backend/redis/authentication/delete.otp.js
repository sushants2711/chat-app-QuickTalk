import redisClient from "../../config/redis/redis.connect.js";

export const deleteOTP = async (email) => {
  const otpKey = `otp:verify:${email}`;
  return await redisClient.del(otpKey);
};
