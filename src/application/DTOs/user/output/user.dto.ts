import { UserRole } from "../../../../core/domain/enums/user.enum";

export type UserOutputDTO = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type AuthenticatedUserOutputDTO = UserOutputDTO & { token: string };
