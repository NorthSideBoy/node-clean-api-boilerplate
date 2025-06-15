import { inject, injectable } from "tsyringe";
import { CreateUserInputDTO } from "../../DTOs/user/input/create-user.dto";
import { AuthenticatedUserOutputDTO } from "../../DTOs/user/output/user.dto";
import { User } from "../../../core/domain/entities/user.entity";
import { mapAuthenticatedUserToOutputDTO } from "../../mappers/entity/user.mapper";
import IUsersRepository from "../../../core/contracts/repositories/user.repository";
import ITokenizer from "../../../core/contracts/services/tokenizer.service";
import TokenPayload from "../../../core/domain/value-objects/token-payload.vo";
import IHasher from "../../../core/contracts/services/hasher.service";
import ICreateUserUseCase from "../../../core/contracts/use-cases/user/create-user.use-case";

@injectable()
export default class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    @inject("UserRepository")
    private readonly userRepository: IUsersRepository,

    @inject("Tokenizer")
    private readonly tokenizer: ITokenizer,

    @inject("Hasher")
    private readonly hasher: IHasher
  ) {}

  public async execute(
    input: CreateUserInputDTO
  ): Promise<AuthenticatedUserOutputDTO> {
    const hashedPassword = await this.hasher.hash(input.password);

    const user = new User({
      ...input,
      password: hashedPassword,
    });

    const newUser = await this.userRepository.create(user);

    if (!newUser) throw new Error("User has not been created");

    const complete = newUser.toComplete();

    const payload: TokenPayload = {
      sub: complete.id,
      role: complete.role,
    };

    const token = this.tokenizer.generate(payload);
    if (!newUser.id || !newUser.createdAt || !newUser.updatedAt) {
      throw new Error("Missing required user fields");
    }

    const outputUser = mapAuthenticatedUserToOutputDTO(newUser, token);

    return outputUser;
  }
}
