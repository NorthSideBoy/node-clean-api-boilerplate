import { PrismaClient } from "../../../generated/prisma";
const prisma = new PrismaClient();
export default prisma;

export const connectToDatabase = async (): Promise<void> => {
  const { container } = await import("tsyringe");
  const logger =
    container.resolve<
      import("../../../core/contracts/services/logger.service").default
    >("Logger");

  try {
    await prisma.$connect();
    await prisma.$runCommandRaw({ ping: 1 });

    logger.info("Connected to the database");
  } catch (error) {
    logger.error(`Failed to connect to the database: ${error as Error}`);
    process.exit(1);
  }
};
