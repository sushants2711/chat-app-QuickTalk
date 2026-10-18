import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT;
export const MONGO_URI = process.env.MONGO_URI;
export const REDIS_URI = process.env.REDIS_URI;
export const NODE_ENV = process.env.NODE_ENV;
export const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS;
export const SMTP_HOST = process.env.SMTP_HOST;
export const SMTP_PORT = process.env.SMTP_PORT;
export const SMTP_USER = process.env.SMTP_USER;
export const SMTP_PASS = process.env.SMTP_PASS;