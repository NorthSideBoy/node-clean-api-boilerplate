import { CreateUserInputDTO } from "../../../../application/DTOs/user/input/create-user.dto";
import { AuthenticatedUserOutputDTO } from "../../../../application/DTOs/user/output/user.dto";

export default interface ICreateUserUseCase {
  execute(input: CreateUserInputDTO): Promise<AuthenticatedUserOutputDTO>;
}
