import { UserRole } from "../../../../core/domain/enums/user.enum";

export interface UpdateUserProfileInputDTO {
  name?: string;
  email?: string;
  role?: UserRole,
  status?:boolean
}
