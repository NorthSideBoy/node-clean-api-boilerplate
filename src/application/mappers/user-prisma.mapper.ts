import { User as PrismaUser } from "../../generated/prisma";
import { User } from "../../core/domain/entities/user.entity";
import { UserRole } from "../../core/domain/enums/user.enum";

export class UserPrismaMapper {
  static toDomain(prismaUser: PrismaUser): User {
    return new User({
      id: prismaUser.id,
      name: prismaUser.name,
      email: prismaUser.email,
      password: prismaUser.password,
      role: prismaUser.role as UserRole,
      createdAt: prismaUser.createdAt,
      updatedAt: prismaUser.updatedAt,
    });
  }

  static toPrisma(user: User): PrismaUser {
    return {
      id: user.id!,
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    } as PrismaUser;
  }
}
