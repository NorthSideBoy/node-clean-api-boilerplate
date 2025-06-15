import Prisma from "../../orms/prisma.adapter";
import IUsersRepository from "../../../../core/contracts/repositories/user.repository";
import { User } from "../../../../core/domain/entities/user.entity";
import UserPrismaMapper from "../../../../application/mappers/repository/prisma/user.mapper";
import handlePrismaError from "../../../handlers/prisma/error.handler";

const prisma = new Prisma().client;

export default class UsersPrismaRepository implements IUsersRepository {
  async create(user: User): Promise<User> {
    try {
      const data = UserPrismaMapper.toPrisma(user);
      const created = await prisma.users.create({ data });
      return UserPrismaMapper.toDomain(created);
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findById(id: string): Promise<User | null> {
    try {
      const found = await prisma.users.findUnique({ where: { id } });
      return found ? UserPrismaMapper.toDomain(found) : null;
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const found = await prisma.users.findUnique({ where: { email } });
      return found ? UserPrismaMapper.toDomain(found) : null;
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const users = await prisma.users.findMany();
      return users.map(UserPrismaMapper.toDomain);
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async update(id: string, data: Partial<User>): Promise<number> {
    try {
      const result = await prisma.users.updateMany({ where: { id }, data });
      return result.count;
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async delete(id: string): Promise<number> {
    try {
      const result = await prisma.users.deleteMany({ where: { id } });
      return result.count;
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async updatePassword(id: string, password: string): Promise<number> {
    try {
      const data = Object.assign({}, { password });
      const result = await prisma.users.updateMany({ where: { id }, data });
      return result.count;
    } catch (error) {
      handlePrismaError(error);
    }
  }
}
