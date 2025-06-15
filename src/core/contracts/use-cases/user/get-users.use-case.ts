import { UserOutputDTO } from "../../../../application/DTOs/user/output/user.dto";

export default interface IGetUsersUseCase {
  execute(): Promise<UserOutputDTO[]>;
}
