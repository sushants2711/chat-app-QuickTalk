import redisClient from "../../config/redis/redis.connect.js";

export const storeOTP = async (email, otp) => {
  const otpKey = `otp:verify:${email}`;

  await redisClient.set(otpKey, otp, {
    EX: 5 * 60,
  });

  return true;
};
