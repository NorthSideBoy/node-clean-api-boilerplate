import { inject, injectable } from "tsyringe";
import IUsersRepository from "../../../core/contracts/repositories/user.repository";
import IDeleteUserUseCase from "../../../core/contracts/use-cases/user/delete-user.use-case";
import { OperationResultOutputDTO } from "../../DTOs/operation/output/operation-result";
import NotFoundError from "../../../shared/errors/application/not-found.error";

@injectable()
export default class DeleteUserUseCase implements IDeleteUserUseCase {
  constructor(
    @inject("UserRepository")
    private readonly userRepository: IUsersRepository
  ) {}

  public async execute(id: string): Promise<OperationResultOutputDTO> {
    const affected = await this.userRepository.delete(id);

    if (affected === 0) throw new NotFoundError(`User with id ${id} not found`);

    const result = {
      success: true,
      affected,
      message: "User deleted successfully",
    };

    return result;
  }
}
