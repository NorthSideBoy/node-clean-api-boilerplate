import express from "express";
import cors from "cors";
import { json, urlencoded } from "body-parser";
import { errorHandler } from "./middlewares/error.middleware";
import userRoutes from "./routes/user.route"

export default async function createServer(): Promise<express.Application> {
  const app = express();
  app.use(cors());
  app.use(json());
  app.use(urlencoded({ extended: true }));

  app.use("/users", userRoutes)
  app.use(errorHandler);

  return app;
}
