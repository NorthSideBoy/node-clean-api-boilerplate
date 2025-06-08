import { env } from "../../config/env.config";
import { container } from "tsyringe";

import ILogger from "../../core/contracts/services/logger.service";
import WinstonLoggerConfig from "../../config/winston-logger.config";
import {
  LogLevel,
  WinstonLogger,
} from "../../infrastructure/adapters/winston-logger/winston-logger.adapter";
import ITokenizer from "../../core/contracts/services/tokenizer.service";
import JwtToken from "../../infrastructure/adapters/token/jwt.adapter";
import ISerializer from "../../core/contracts/services/serializer.service";
import SerializeError from "../../infrastructure/adapters/serializer/serialize-error.adapter";
import IValidator from "../../core/contracts/services/validator.service";
import ZodValidator from "../../infrastructure/adapters/zod/zod.adapter";

container
  .register<ILogger>("Logger", {
    useValue: new WinstonLogger(WinstonLoggerConfig.logLevel as LogLevel),
  })
  .register<ITokenizer>("Tokenizer", {
    useValue: new JwtToken(env.JWT.SECRET, env.JWT.EXPIRES_IN),
  })
  .register<ISerializer>("Serializer", {
    useClass: SerializeError,
  })
  .register<IValidator>("Validator", {
    useClass: ZodValidator,
  });
