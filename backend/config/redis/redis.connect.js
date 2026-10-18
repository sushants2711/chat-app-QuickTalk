import { createClient } from "redis";
import { REDIS_URI } from "../constant.js";

const redisClient = createClient({
  url: REDIS_URI,
});

redisClient.on("error", (err) => {
  console.error("Redis Error:", err);
});

redisClient.on("connect", () => {
  console.log("Redis connecting...");
});

redisClient.on("ready", () => {
  console.log("Redis connected successfully");
});

export default redisClient;
