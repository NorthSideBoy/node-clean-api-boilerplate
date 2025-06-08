import { User } from "../../domain/entities/user.entity";
export default interface IUserRepository {
  create(data: User): Promise<User>;
  findById(id: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  update(id: string, data: User): Promise<User>;
  delete(id: string): Promise<void>;
  updatePassword(id: string, newPassword: string): Promise<void>;
}
