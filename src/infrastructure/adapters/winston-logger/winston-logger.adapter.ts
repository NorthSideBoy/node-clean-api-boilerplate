import * as winston from "winston";
import { format, transports } from "winston";
import ILogger from "../../../core/contracts/services/logger.service";

export type LogLevel = "error" | "warn" | "info" | "debug";

export class WinstonLogger implements ILogger {
  private logger: winston.Logger;

  constructor(logLevel: LogLevel) {
    this.logger = winston.createLogger({
      level: logLevel,
      format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.printf(
          ({
            timestamp,
            level,
            message,
            name,
            type = "App",
            service = "System",
          }) => {
            if (name)
              return `[${timestamp}] ${type}[${service}] ${level}<${name}>: ${message}`;
            return `[${timestamp}] ${type}[${service}] ${level}: ${message}`;
          }
        )
      ),
      transports: [new transports.Console()],
    });
  }

  error(message: any): void {
    this.logger.error(message);
  }

  warning(message: any): void {
    this.logger.warn(message);
  }

  info(message: any): void {
    this.logger.info(message);
  }

  debug(message: any): void {
    this.logger.debug(message);
  }
}
