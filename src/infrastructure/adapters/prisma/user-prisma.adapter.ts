import IUserRepository from "../../../core/contracts/repositories/user.repository";
import { User } from "../../../core/domain/entities/user.entity";
import { UserPrismaMapper } from "../../../application/mappers/user-prisma.mapper";
import { PrismaClientKnownRequestError } from "../../../generated/prisma/runtime/library";
import ConflictError from "../../../shared/errors/application/conflict.error";
import prisma from "./prisma-client";
import bcrypt from "bcrypt";

export default class UserPrismaRepository implements IUserRepository {
  async create(user: User): Promise<User> {
    try {
      const data = UserPrismaMapper.toPrisma(user);
      const created = await prisma.user.create({ data });
      return UserPrismaMapper.toDomain(created);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        switch (error.code) {
          case "P2002":
            const rawTarget = error.meta?.target;
            const target = Array.isArray(rawTarget)
              ? rawTarget.join(", ")
              : String(rawTarget);
            const message = `Duplicate entry detected for field(s): ${target}`;
            throw new ConflictError(message);
            break;
          default:
            throw error;
        }
      }
      throw error;
    }
  }

  async findById(id: string): Promise<User | null> {
    const found = await prisma.user.findUnique({ where: { id } });
    return found ? UserPrismaMapper.toDomain(found) : null;
  }

  async findAll(): Promise<User[]> {
    const users = await prisma.user.findMany();
    return users.map(UserPrismaMapper.toDomain);
  }

  async update(id: string, user: User): Promise<User> {
    const data = UserPrismaMapper.toPrisma(user);
    const updated = await prisma.user.update({ where: { id }, data });
    return UserPrismaMapper.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({ where: { id } });
  }

  async updatePassword(id: string, newPassword: string): Promise<void> {
    const hashed = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id },
      data: { password: hashed },
    });
  }
}
