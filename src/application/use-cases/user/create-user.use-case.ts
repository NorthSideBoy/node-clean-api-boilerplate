import { inject, injectable } from "tsyringe";
import { CreateUserInputDTO } from "../../DTOs/user/input/create-user.dto";
import { UserOutputDTO } from "../../DTOs/user/output/user.dto";
import { User } from "../../../core/domain/entities/user.entity";
import { hasId } from "../../../core/domain/guards/user.guard";
import { mapUserToOutputDTO } from "../../mappers/user.mapper";
import { BaseLogger } from "../../../core/domain/value-objects/logger.vo";
import IUserRepository from "../../../core/contracts/repositories/user.repository";
import ITokenizer from "../../../core/contracts/services/tokenizer.service";
import TokenPayload from "../../../core/domain/value-objects/token-payload.vo";
import ILogger from "../../../core/contracts/services/logger.service";
import ISerializer from "../../../core/contracts/services/serializer.service";
import IHasher from "../../../core/contracts/services/hasher.service";
import ICreateUserUseCase from "../../../core/contracts/use-cases/user/create-user.use-case";

@injectable()
export default class CreateUserUseCase implements ICreateUserUseCase{
  private name: string;
  constructor(
    @inject("UserRepository")
    private readonly userRepository: IUserRepository,

    @inject("Tokenizer")
    private readonly tokenizer: ITokenizer,

    @inject("Logger")
    private readonly logger: ILogger,

    @inject("Serializer")
    private readonly serializer: ISerializer,

    @inject("IHasher")
    private readonly hasher: IHasher
  ) {
    this.name = "CreateUser";
  }

  public async execute(
    input: CreateUserInputDTO
  ): Promise<UserOutputDTO & { token: string }> {
    const logger = new BaseLogger(
      this.logger,
      this.serializer,
      "UseCase",
      this.name
    );

    logger.info("Start");

    const now = new Date();

    const hashedPassword = await this.hasher.hash(input.password, 10);

    const user = new User({
      name: input.name,
      email: input.email,
      role: input.role,
      password: hashedPassword,
      createdAt: now,
      updatedAt: now,
    });

    const newUser = await this.userRepository.create(user);

    if (!newUser) throw new Error("User has not been created");

    if (!hasId(newUser))
      throw new Error("User must have a valid ID after creation");

    logger.info(`User with email '${user.email}' has been created`);

    const payload: TokenPayload = {
      sub: newUser.id,
      role: newUser.role,
    };

    const token = this.tokenizer.generate(payload);

    logger.info("End");

    return {
      ...mapUserToOutputDTO(newUser),
      token,
    };
  }
}
