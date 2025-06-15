import { OperationResultOutputDTO } from "../../../../application/DTOs/operation/output/operation-result";

export default interface IUpdateUserPasswordUseCase {
  execute(id: string, password: string): Promise<OperationResultOutputDTO>;
}
