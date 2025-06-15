import { inject, injectable } from "tsyringe";
import { mapUserToOutputDTO } from "../../mappers/entity/user.mapper";
import { UserOutputDTO } from "../../DTOs/user/output/user.dto";
import IUsersRepository from "../../../core/contracts/repositories/user.repository";
import IUpdateUserPasswordUseCase from "../../../core/contracts/use-cases/user/update-user-password.use-case";
import NotFoundError from "../../../shared/errors/application/not-found.error";
import IHasher from "../../../core/contracts/services/hasher.service";
import ConflictError from "../../../shared/errors/application/conflict.error";
import { OperationResultOutputDTO } from "../../DTOs/operation/output/operation-result";

@injectable()
export default class UpdateUserPasswordUseCase
  implements IUpdateUserPasswordUseCase
{
  constructor(
    @inject("UserRepository")
    private readonly userRepository: IUsersRepository,

    @inject("Hasher")
    private readonly hasher: IHasher
  ) {}

  public async execute(
    id: string,
    password: string
  ): Promise<OperationResultOutputDTO> {
    const user = await this.userRepository.findById(id);

    if (!user) throw new NotFoundError(`User with id ${id} not found`);

    const isSamePassword = await this.hasher.compare(password, user.password);

    if (isSamePassword)
      throw new ConflictError(
        "The new password must be different from the current one"
      );

    const hashedPassword = await this.hasher.hash(password);

    const affected = await this.userRepository.updatePassword(
      id,
      hashedPassword
    );

    const result = {
      success: true,
      affected,
      message: "User password updated successfully",
    };

    return result;
  }
}
