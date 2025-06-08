import { container } from "tsyringe";
import IUserRepository from "../../core/contracts/repositories/user.repository";
import UserPrismaRepository from "../../infrastructure/adapters/prisma/user-prisma.adapter";
import IHasher from "../../core/contracts/services/hasher.service";
import BcryptHasher from "../../infrastructure/adapters/hasher/bcrypt.adapter";
import CreateUserUseCase from "../../application/use-cases/user/create-user.use-case";

container
  .register<IUserRepository>("UserRepository", {
    useClass: UserPrismaRepository,
  })
  .register<IHasher>("IHasher", {
    useClass: BcryptHasher,
  })
  .register<CreateUserUseCase>("CreateUserUseCase", {
    useClass: CreateUserUseCase,
  });
