import swaggerJSDoc from "swagger-jsdoc";
import { APP_NAME, PORT } from "../constantData/constant.js";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: `${APP_NAME} API Documentation`,
    version: "1.0.0",
    description: `RESTful API documentation for ${APP_NAME} Chat Application`,
    contact: {
      name: `${APP_NAME} Support`,
    },
  },
  servers: [
    {
      url: `http://localhost:${PORT}`,
      description: "Development Server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Enter your JWT token: Bearer <token>",
      },
      cookieAuth: {
        type: "apiKey",
        in: "cookie",
        name: "token",
        description: "JWT token in HTTP-only cookie",
      },
    },
  },
};

const swaggerOptions = {
  swaggerDefinition,
  apis: ["./utils/swaggerApiDocs/**/*.js"],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
export default swaggerSpec;
