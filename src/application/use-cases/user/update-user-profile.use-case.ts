import { inject, injectable } from "tsyringe";
import { mapUserToOutputDTO } from "../../mappers/entity/user.mapper";
import IUsersRepository from "../../../core/contracts/repositories/user.repository";
import IUpdateUserProfileUseCase from "../../../core/contracts/use-cases/user/update-user-profile.use-case";
import { UpdateUserProfileInputDTO } from "../../DTOs/user/input/update-user-profile.dto";
import NotFoundError from "../../../shared/errors/application/not-found.error";
import { OperationResultOutputDTO } from "../../DTOs/operation/output/operation-result";

@injectable()
export default class UpdateUserProfileUseCase
  implements IUpdateUserProfileUseCase
{
  constructor(
    @inject("UserRepository")
    private readonly userRepository: IUsersRepository
  ) {}

  public async execute(
    id: string,
    input: UpdateUserProfileInputDTO
  ): Promise<OperationResultOutputDTO> {
    const affected = await this.userRepository.update(id, input);

    if (affected === 0) throw new NotFoundError(`User with id ${id} not found`);

    const response = {
      success: true,
      affected,
      message: "User updated successfully",
    };

    return response;
  }
}
