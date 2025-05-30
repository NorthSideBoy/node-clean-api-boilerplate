import { container } from "tsyringe";

import Logger from "../../core/contracts/logger.contract";
import WinstonLoggerConfig from "../../config/winston-logger.config";

import {
  LogLevel,
  WinstonLogger,
} from "../../infrastructure/adapters/winston-logger/winston-logger.adapter";

container.register<Logger>("Logger", {
  useValue: new WinstonLogger(WinstonLoggerConfig.logLevel as LogLevel),
});