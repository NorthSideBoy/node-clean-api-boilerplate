import { Users as PrismaUser } from "@prisma/client";
import { User } from "../../../../core/domain/entities/user.entity";
import { UserRole } from "../../../../core/domain/enums/user.enum";

export default class UserPrismaMapper {  
  static toDomain(prismaUser: PrismaUser): User {
    return new User({
      id: prismaUser.id,
      name: prismaUser.name,
      email: prismaUser.email,
      password: prismaUser.password,
      role: prismaUser.role as UserRole,
      status: prismaUser.status,
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
      role: user.role as UserRole,
      status: user.status!,
      createdAt: user.createdAt!,
      updatedAt: user.updatedAt!,
    } as PrismaUser
  }
}
