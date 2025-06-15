import "reflect-metadata";
import "./container";
import { env } from "./config/env.config";
import { getLogger } from "./shared/utils/getters/logger";
import { bootstrap } from "./bootstrap";
import createServer from "./interfaces/express/server";
const logger = getLogger();

const start = async (): Promise<void> => {
  try {
    await bootstrap();
    const app = await createServer();
    app.listen(env.PORT, () => {
      logger.info(`Server is running on port ${env.PORT}`);
      logger.info(`Http documentation in http://${env.HOST}:${env.PORT}/docs`);
    });
  } catch (error) {
    logger.error(error);
  }
};

start();
