import { LoginUserInputDTO } from "../../../../application/DTOs/user/input/login-user.dto";
import { AuthenticatedUserOutputDTO } from "../../../../application/DTOs/user/output/user.dto";

export default interface ILoginUserUseCase {
  execute(input: LoginUserInputDTO): Promise<AuthenticatedUserOutputDTO>;
}
