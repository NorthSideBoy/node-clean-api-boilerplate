// src/interfaces/express/controllers/user.controller.ts
import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserCodec } from "../../../application/codecs/user/create-user.codec";
import InvalidInputError from "../../../shared/errors/application/invalid-input.error";
import ILogger from "../../../core/contracts/services/logger.service";
import { ControllerLogger } from "../../../core/domain/value-objects/logger.vo";
import ISerializer from "../../../core/contracts/services/serializer.service";
import IValidator from "../../../core/contracts/services/validator.service";
import { CreateUserInputDTO } from "../../../application/DTOs/user/input/create-user.dto";
import ICreateUserUseCase from "../../../core/contracts/use-cases/user/create-user.use-case";

const logger = container.resolve<ILogger>("Logger");
const serializer = container.resolve<ISerializer>("Serializer");
const validator = container.resolve<IValidator>("Validator");
const useCase = container.resolve<ICreateUserUseCase>("CreateUserUseCase")

export const createUserController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const Logger = new ControllerLogger(
    logger,
    serializer,
    "CreateUser",
    req.route,
    req.method,
    "",
    req.body
  );
  try {
    Logger.info("Start");
    const decode = validator.decode<CreateUserInputDTO>(
      CreateUserCodec,
      req.body
    );
    if (!decode.success) throw new InvalidInputError(decode.error);
    const result = await useCase.execute(decode.data);
    Logger.info("End");
    return res.status(201).json(result);
  } catch (error: any) {
    Logger.error(error);
    throw error;
  }
};
