import { inject, injectable } from "tsyringe";
import { UserOutputDTO } from "../../DTOs/user/output/user.dto";
import { mapUserToOutputDTO } from "../../mappers/entity/user.mapper";
import IUsersRepository from "../../../core/contracts/repositories/user.repository";
import IGetUsersUseCase from "../../../core/contracts/use-cases/user/get-users.use-case";

@injectable()
export default class GetUsersUseCase implements IGetUsersUseCase {
  constructor(
    @inject("UserRepository")
    private readonly userRepository: IUsersRepository
  ) {}

  public async execute(): Promise<UserOutputDTO[]> {
    const users = await this.userRepository.findAll();

    const outputUsers = users.map(mapUserToOutputDTO);

    return outputUsers;
  }
}
