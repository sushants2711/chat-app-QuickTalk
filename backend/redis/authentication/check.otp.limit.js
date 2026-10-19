import redisClient from "../../config/redis/redis.connect.js";

export const checkOTPLimit = async (email) => {
    const dailyKey = `otp:daily:${email}`;

    const count = await redisClient.get(dailyKey);

    if (count && Number(count) >= 5) {
        return false;
    }

    return true;
};