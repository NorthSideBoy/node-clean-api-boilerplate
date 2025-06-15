import { getLogger } from "./shared/utils/getters/logger";
import { getOrm } from "./shared/utils/getters/orm";

export const bootstrap = async (): Promise<void> => {
  const logger = getLogger();
  const orm = getOrm();
  try {
    logger.info("Initializing application...");
    const isConected = await orm.connect();
    if (isConected) logger.info("Database connected");
    logger.info("Application started");
  } catch (error) {
    logger.error("Application initialization failed");
    logger.error(error);
    process.exit(1);
  }
};
