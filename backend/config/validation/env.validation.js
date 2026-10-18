import dotenv from "dotenv";
dotenv.config();

// Validate that all required environment variables are present
export const validateEnv = () => {
  const requiredEnvVars = [
    "PORT",
    "MONGO_URI",
    "REDIS_URI",
    "NODE_ENV",
    "ALLOWED_ORIGINS",
    "SMTP_HOST",
    "SMTP_PORT",
    "SMTP_USER",
    "SMTP_PASS",
  ];

  const missingVars = requiredEnvVars.filter((curr) => !process.env[curr]);

  if (missingVars.length > 0) {
    console.error("[ERROR] Missing required environment variables:");

    missingVars.forEach((curr) => {
      console.error(`   - ${curr}`);
    });

    console.error(
      "Please check your .env file and ensure all required variables are set.",
    );

    process.exit(1);
  }

  // Keep this as console.log since logger might not be initialized yet
  console.log("[OK] All required environment variables are present");
};
