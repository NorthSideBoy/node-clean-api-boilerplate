import { User } from "../../domain/entities/user.entity";
export default interface IUsersRepository {
  create(data: User): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  update(id: string, data: Partial<User>): Promise<number>;
  delete(id: string): Promise<number>;
  updatePassword(id: string, password: string): Promise<number>;
}
