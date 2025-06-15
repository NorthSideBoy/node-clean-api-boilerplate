import { UserRole } from "../../../../core/domain/enums/user.enum";
export interface CreateUserInputDTO {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  status?: boolean;
}
