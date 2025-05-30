import { IUserRepository } from "../../../core/contracts/repositories/user.repository";
import { User } from "../../../core/domain/entities/user.entity";
import prisma from "./prisma-client";
import { CreateUserInputDTO } from "../../../application/DTOs/user/input/create-user.dto";
import { UpdateUserInputDTO } from "../../../application/DTOs/user/input/update-user.dto";

export class UserPrismaRepository implements IUserRepository {
  async create(data: CreateUserInputDTO): Promise<User> {
    const created = await prisma.user.create({
      data: {
        name:data.name,
        email:data.email
      }
    });

    return this.mapToEntity(created);
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id } });

    return user ? this.mapToEntity(user) : null;
  }

  async findAll(): Promise<User[]> {
    const users = await prisma.user.findMany();
    return users.map((u) => this.mapToEntity(u));
  }

  async update(id: string, data: UpdateUserInputDTO): Promise<User> {
    const updated = await prisma.user.update({ where: { id }, data });
    return this.mapToEntity(updated);
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({ where: { id } });
  }

  private mapToEntity(raw: any): User {
    return new User(
      raw.id.toString(),
      raw.name,
      raw.email,
      raw.createdAt,
      raw.updatedAt
    );
  }
}
