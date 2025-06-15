import IOrm from "../../core/contracts/services/orm.service";
import Prisma from "../../infrastructure/adapters/orms/prisma.adapter";
import { env } from "../../config/env.config";
import { container } from "tsyringe";
import ILogger from "../../core/contracts/services/logger.service";
import WinstonLoggerConfig from "../../config/winston-logger.config";
import WinstonLogger from "../../infrastructure/adapters/loggers/winston-logger.adapter";
import ITokenizer from "../../core/contracts/services/tokenizer.service";
import JwtToken from "../../infrastructure/adapters/tokenizers/jwt.adapter";
import ISerializer from "../../core/contracts/services/serializer.service";
import SerializeError from "../../infrastructure/adapters/serializers/serialize-error.adapter";
import IValidator from "../../core/contracts/services/validator.service";
import ZodValidator from "../../infrastructure/adapters/validators/zod.adapter";
import IMapper from "../../core/contracts/services/mapper.service";
import ClassTransformer from "../../infrastructure/adapters/mappers/class-transformer.adapter";

container
  .register<IOrm>("Orm", {
    useClass: Prisma,
  })
  .register<ILogger>("Logger", {
    useValue: new WinstonLogger(WinstonLoggerConfig.logLevel),
  })
  .register<ITokenizer>("Tokenizer", {
    useValue: new JwtToken(env.JWT.SECRET, env.JWT.EXPIRES_IN),
  })
  .register<ISerializer>("Serializer", {
    useClass: SerializeError,
  })
  .register<IValidator>("Validator", {
    useClass: ZodValidator,
  })
  .register<IMapper>("Mapper", {
    useClass: ClassTransformer,
  });
