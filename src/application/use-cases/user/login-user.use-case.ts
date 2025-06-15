import { inject, injectable } from "tsyringe";
import { AuthenticatedUserOutputDTO } from "../../DTOs/user/output/user.dto";
import { mapAuthenticatedUserToOutputDTO } from "../../mappers/entity/user.mapper";
import IUsersRepository from "../../../core/contracts/repositories/user.repository";
import ITokenizer from "../../../core/contracts/services/tokenizer.service";
import IHasher from "../../../core/contracts/services/hasher.service";
import { LoginUserInputDTO } from "../../DTOs/user/input/login-user.dto";
import ILoginUserUseCase from "../../../core/contracts/use-cases/user/login-user.use-case";
import UnauthorizedError from "../../../shared/errors/application/unauthorized.error";
import TokenPayload from "../../../core/domain/value-objects/token-payload.vo";

@injectable()
export default class LoginUserUseCase implements ILoginUserUseCase {
  constructor(
    @inject("UserRepository")
    private readonly userRepository: IUsersRepository,

    @inject("Tokenizer")
    private readonly tokenizer: ITokenizer,

    @inject("Hasher")
    private readonly hasher: IHasher
  ) {}

  public async execute(
    input: LoginUserInputDTO
  ): Promise<AuthenticatedUserOutputDTO> {
    const user = await this.userRepository.findByEmail(input.email);

    if (!user) throw new UnauthorizedError("Invalid credentials");

    const complete = user.toComplete();

    const passwordIsValid = await this.hasher.compare(
      input.password,
      complete.password
    );

    if (!passwordIsValid) throw new UnauthorizedError("Invalid credentials");

    const payload: TokenPayload = {
      sub: complete.id,
      role: complete.role,
    };

    const token = this.tokenizer.generate(payload);

    const outputUser = mapAuthenticatedUserToOutputDTO(user, token);

    return outputUser;
  }
}
