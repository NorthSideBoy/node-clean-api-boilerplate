import { User } from "../../../core/domain/entities/user.entity";
import {
  UserOutputDTO,
  AuthenticatedUserOutputDTO,
} from "../../DTOs/user/output/user.dto";

export function mapUserToOutputDTO(user: User): UserOutputDTO {
  return {
    id: user.id!,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status!,
    createdAt: user.createdAt!,
    updatedAt: user.updatedAt!,
  };
}

export function mapAuthenticatedUserToOutputDTO(
  user: User,
  token: string
): AuthenticatedUserOutputDTO {
  return {
    id: user.id!,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status!,
    createdAt: user.createdAt!,
    updatedAt: user.updatedAt!,
    token,
  };
}
