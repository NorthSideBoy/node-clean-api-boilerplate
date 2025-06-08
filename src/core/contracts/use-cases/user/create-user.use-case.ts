import { CreateUserInputDTO } from "../../../../application/DTOs/user/input/create-user.dto";
import { UserOutputDTO } from "../../../../application/DTOs/user/output/user.dto";

export default interface ICreateUserUseCase {
  execute(input: CreateUserInputDTO): Promise<UserOutputDTO & { token: string }>;
}
