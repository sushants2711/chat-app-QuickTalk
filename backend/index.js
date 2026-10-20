import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { validateEnv } from "./config/envValidation/env.validation.js";
import { ALLOWED_ORIGINS, PORT } from "./config/constantData/constant.js";
import { connectDb } from "./config/mongodb/db.connect.js";
import redisClient from "./config/redis/redis.connect.js";
import { requestLogger } from "./middleware/logger/request.logger.js";
import { setupSwaggerDocs } from "./utils/swaggerApiDocs/swaggerDocuments/swagger.docs.js";
import userRouter from "./router/authentication/user.router.js";
import sessionRouter from "./router/session/session.router.js";

// dotenv config
dotenv.config();

// validate env
validateEnv();

// app config
const app = express();

// Setup logging
app.use(requestLogger);

// swagger api docs
setupSwaggerDocs(app);

// port number
const PORTNUMBER = PORT;

// mongo db connection
connectDb();

// redis db connection
await redisClient.connect();

// helmet config
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);

// cookie parser config
app.use(cookieParser());

// body parser config
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

// cors config
const origins = ALLOWED_ORIGINS
  ? ALLOWED_ORIGINS.split(",").map((origin) => origin.trim())
  : [];

app.use(
  cors({
    origin: origins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    exposedHeaders: ["Set-Cookie"],
    maxAge: 86400,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  }),
);

// health check route
app.get("/health", (req, res) => {
  const dbStatus =
    mongoose.connection.readyState === 1 ? "Connected" : "Disconnected";
  res.status(200).json({
    success: true,
    message: "Server is healthy",
    database: dbStatus,
    timestamp: new Date().toISOString(),
  });
});

// server working route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is working",
    timestamp: new Date().toISOString(),
  });
});

// api end points
app.use("/api/v1/user", userRouter);
app.use("/api/v1/session", sessionRouter);

// server start
app.listen(PORTNUMBER, () => {
  console.log(`Server is running on port ${PORTNUMBER}`);
});
