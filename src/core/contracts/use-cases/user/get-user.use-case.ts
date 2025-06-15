import { UserOutputDTO } from "../../../../application/DTOs/user/output/user.dto";

export default interface IGetUserUseCase {
  execute(id: string): Promise<UserOutputDTO>;
}
