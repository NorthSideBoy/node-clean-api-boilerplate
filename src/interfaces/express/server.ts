import express from "express";
import cors from "cors";
import { json, urlencoded } from "body-parser";
import { errorHandler } from "./middlewares/error.middleware";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../express/docs/swagger.json";
import { RegisterRoutes } from "./routes/routes";

export default async function createServer(): Promise<express.Application> {
  const app = express();
  app.use(cors());
  app.use(json());
  app.use(urlencoded({ extended: true }));

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  RegisterRoutes(app);

  app.use(errorHandler);

  return app;
}
