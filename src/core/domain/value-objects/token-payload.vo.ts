import { UserRole } from "../../domain/enums/user.enum";

export default interface TokenPayload {
  sub: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}
