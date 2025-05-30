import "reflect-metadata";
import "./container/index";
import { env } from "./config/env.config";
import createServer from "./interfaces/express/server";
import { container } from "tsyringe";
import Logger from "./core/contracts/services/logger.service";
const logger = container.resolve<Logger>("Logger");

const start = async (): Promise<void> => {
  try {
    const app = await createServer();
    app.listen(env.PORT, () => {
      logger.info(`Server is running on port ${env.PORT}`);
    });
  } catch (error) {
    logger.error(error);
  }
};

start();
