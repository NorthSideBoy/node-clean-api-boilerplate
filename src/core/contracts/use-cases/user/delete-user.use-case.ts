import { OperationResultOutputDTO } from "../../../../application/DTOs/operation/output/operation-result";

export default interface IDeleteUserUseCase {
  execute(id: string): Promise<OperationResultOutputDTO>;
}
