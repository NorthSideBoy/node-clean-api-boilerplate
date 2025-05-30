import { container } from "tsyringe";

import Logger from "../../core/contracts/services/logger.service";
import WinstonLoggerConfig from "../../config/winston-logger.config";
import {
  LogLevel,
  WinstonLogger,
} from "../../infrastructure/adapters/winston-logger/winston-logger.adapter";

import { IUserRepository } from "../../core/contracts/repositories/user.repository";
import { UserPrismaRepository } from "../../infrastructure/adapters/prisma/user-prisma.repository";

container
  .register<Logger>("Logger", {
    useValue: new WinstonLogger(WinstonLoggerConfig.logLevel as LogLevel),
  })
  .register<IUserRepository>("UserRepository", {
    useClass: UserPrismaRepository,
  });
