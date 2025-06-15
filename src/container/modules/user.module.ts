import { container } from "tsyringe";
import IUsersRepository from "../../core/contracts/repositories/user.repository";
import UsersPrismaRepository from "../../infrastructure/adapters/repositories/prisma/users.adapter";
import IHasher from "../../core/contracts/services/hasher.service";
import BcryptHasher from "../../infrastructure/adapters/hashers/bcrypt.adapter";
import ICreateUserUseCase from "../../core/contracts/use-cases/user/create-user.use-case";
import CreateUserUseCase from "../../application/use-cases/user/create-user.use-case";
import ILoginUserUseCase from "../../core/contracts/use-cases/user/login-user.use-case";
import LoginUserUseCase from "../../application/use-cases/user/login-user.use-case";
import IGetUserUseCase from "../../core/contracts/use-cases/user/get-user.use-case";
import GetUserUseCase from "../../application/use-cases/user/get-user.use-case";
import IGetUsersUseCase from "../../core/contracts/use-cases/user/get-users.use-case";
import GetUsersUseCase from "../../application/use-cases/user/get-users.use-case";
import IUpdateUserProfileUseCase from "../../core/contracts/use-cases/user/update-user-profile.use-case";
import UpdateUserProfileUseCase from "../../application/use-cases/user/update-user-profile.use-case";
import IUpdateUserPasswordUseCase from "../../core/contracts/use-cases/user/update-user-password.use-case";
import UpdateUserPasswordUseCase from "../../application/use-cases/user/update-user-password.use-case";
import IDeleteUserUseCase from "../../core/contracts/use-cases/user/delete-user.use-case";
import DeleteUserUseCase from "../../application/use-cases/user/delete-user.use-case";

container
  .register<IUsersRepository>("UserRepository", {
    useClass: UsersPrismaRepository,
  })
  .register<IHasher>("Hasher", {
    useClass: BcryptHasher,
  })
  .register<ICreateUserUseCase>("CreateUserUseCase", {
    useClass: CreateUserUseCase,
  })
  .register<ILoginUserUseCase>("LoginUserUseCase", {
    useClass: LoginUserUseCase,
  })
  .register<IGetUserUseCase>("GetUserUseCase", {
    useClass: GetUserUseCase,
  })
  .register<IGetUsersUseCase>("GetUsersUseCase", {
    useClass: GetUsersUseCase,
  })
  .register<IUpdateUserProfileUseCase>("UpdateUserProfileUseCase", {
    useClass: UpdateUserProfileUseCase,
  })
  .register<IUpdateUserPasswordUseCase>("UpdateUserPasswordUseCase", {
    useClass: UpdateUserPasswordUseCase,
  })
  .register<IDeleteUserUseCase>("DeleteUserUseCase", {
    useClass: DeleteUserUseCase,
  });
