import { inject, injectable } from "tsyringe";
import { UserOutputDTO } from "../../DTOs/user/output/user.dto";
import { mapUserToOutputDTO } from "../../mappers/entity/user.mapper";
import IUsersRepository from "../../../core/contracts/repositories/user.repository";
import IGetUserUseCase from "../../../core/contracts/use-cases/user/get-user.use-case";
import NotFoundError from "../../../shared/errors/application/not-found.error";

@injectable()
export default class GetUserUseCase implements IGetUserUseCase {
  constructor(
    @inject("UserRepository")
    private readonly userRepository: IUsersRepository
  ) {}

  public async execute(id: string): Promise<UserOutputDTO> {
    const user = await this.userRepository.findById(id);

    if (!user) throw new NotFoundError(`User with id ${id} not found`);

    const outputUser = mapUserToOutputDTO(user);

    return outputUser;
  }
}
