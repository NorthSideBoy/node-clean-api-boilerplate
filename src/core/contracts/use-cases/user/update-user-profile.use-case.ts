import { OperationResultOutputDTO } from "../../../../application/DTOs/operation/output/operation-result";
import { UpdateUserProfileInputDTO } from "../../../../application/DTOs/user/input/update-user-profile.dto";

export default interface IUpdateUserProfileUseCase {
  execute(id: string, input: UpdateUserProfileInputDTO): Promise<OperationResultOutputDTO>;
}
