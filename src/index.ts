import "reflect-metadata";
import "./container/index";
import { env } from "./config/env.config";
import createServer from "./interfaces/express/server";
import { container } from "tsyringe";
import ILogger from "./core/contracts/services/logger.service";
const logger = container.resolve<ILogger>("Logger");
import { connectToDatabase } from "./infrastructure/adapters/prisma/prisma-client";

const start = async (): Promise<void> => {
  try {
    const app = await createServer();
    app.listen(env.PORT, () => {
      logger.info(`Server is running on port ${env.PORT}`);
    });
    await connectToDatabase()
  } catch (error) {
    logger.error(error);
  }
};

start();
