import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "../../../config/swagger/swagger.config.js";
import { APP_NAME } from "../../../config/constantData/constant.js";

/**
 * Configure and mount Swagger UI on the Express application
 * @param {import("express").Application} app
 */
export const setupSwaggerDocs = (app) => {
  const swaggerUiOptions = {
    customSiteTitle: `${APP_NAME} API Docs`,
    customCss: ".swagger-ui .topbar { display: block; }",
    customCssUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css",
    customJs: [
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js",
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js",
    ],
  };

  // Serve interactive Swagger API documentation
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, swaggerUiOptions),
  );

  // Serve swagger spec as JSON
  app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(swaggerSpec);
  });
};

export default setupSwaggerDocs;
