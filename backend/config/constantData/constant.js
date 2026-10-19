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
export const COOKIE_MAX_AGE = process.env.COOKIE_MAX_AGE;
export const JWT_TOKEN = process.env.JWT_TOKEN;
export const COOKIE_NAME = process.env.COOKIE_NAME;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
export const TOKEN_NAME = process.env.TOKEN_NAME;
