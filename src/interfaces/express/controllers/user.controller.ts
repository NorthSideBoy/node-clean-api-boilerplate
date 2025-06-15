import { inject, injectable } from "tsyringe";
import { CreateUserCodec } from "../../../application/codecs/user/create-user.codec";
import InvalidInputError from "../../../shared/errors/application/invalid-input.error";
import IValidator from "../../../core/contracts/services/validator.service";
import { CreateUserInputDTO } from "../../../application/DTOs/user/input/create-user.dto";
import ICreateUserUseCase from "../../../core/contracts/use-cases/user/create-user.use-case";
import {
  Body,
  Controller,
  Response,
  Post,
  Put,
  Route,
  SuccessResponse,
  Tags,
  Get,
  Path,
  Delete,
  Security,
} from "tsoa";
import {
  UserOutputDTO,
  AuthenticatedUserOutputDTO,
} from "../../../application/DTOs/user/output/user.dto";
import { LoginUserInputDTO } from "../../../application/DTOs/user/input/login-user.dto";
import ILoginUserUseCase from "../../../core/contracts/use-cases/user/login-user.use-case";
import { LoginUserCodec } from "../../../application/codecs/user/login-user.codec";
import IGetUserUseCase from "../../../core/contracts/use-cases/user/get-user.use-case";
import IGetUsersUseCase from "../../../core/contracts/use-cases/user/get-users.use-case";
import IUpdateUserProfileUseCase from "../../../core/contracts/use-cases/user/update-user-profile.use-case";
import { UpdateUserProfileInputDTO } from "../../../application/DTOs/user/input/update-user-profile.dto";
import { UpdateUserProfileCodec } from "../../../application/codecs/user/update-user-profile.codec";
import { UpdateUserPasswordInputDTO } from "../../../application/DTOs/user/input/update-user-password.dto";
import { UpdateUserPasswordCodec } from "../../../application/codecs/user/update-user-password.codec";
import IUpdateUserPasswordUseCase from "../../../core/contracts/use-cases/user/update-user-password.use-case";
import IDeleteUserUseCase from "../../../core/contracts/use-cases/user/delete-user.use-case";
import { OperationResultOutputDTO } from "../../../application/DTOs/operation/output/operation-result";

@Route("users")
@Tags("Users")
@injectable()
export class UserController extends Controller {
  constructor(
    @inject("Validator")
    private readonly validator: IValidator,

    @inject("CreateUserUseCase")
    private readonly createUserUseCase: ICreateUserUseCase,

    @inject("LoginUserUseCase")
    private readonly loginUserUseCase: ILoginUserUseCase,

    @inject("GetUserUseCase")
    private readonly getUserUseCase: IGetUserUseCase,

    @inject("GetUsersUseCase")
    private readonly getUsersUseCase: IGetUsersUseCase,

    @inject("UpdateUserProfileUseCase")
    private readonly updateUserProfileUseCase: IUpdateUserProfileUseCase,

    @inject("UpdateUserPasswordUseCase")
    private readonly updateUserPasswordUseCase: IUpdateUserPasswordUseCase,

    @inject("DeleteUserUseCase")
    private readonly deleteUserUseCase: IDeleteUserUseCase
  ) {
    super();
  }

  /**
   * @summary Register user
   */
  @Post("/register")
  @SuccessResponse(200)
  @Response(400, "InvalidInputError")
  @Response(409, "ConflictError")
  @Response(501, "InternalServerError")
  async create(
    @Body() body: CreateUserInputDTO | unknown
  ): Promise<AuthenticatedUserOutputDTO> {
    const decode = this.validator.decode<CreateUserInputDTO>(
      CreateUserCodec,
      body
    );
    if (!decode.success) throw new InvalidInputError(decode.error);

    const result = await this.createUserUseCase.execute(decode.data);
    return result;
  }

  /**
   * @summary Login user
   */
  @Post("/login")
  @SuccessResponse(200)
  @Response(400, "InvalidInputError")
  @Response(401, "UnauthorizedError")
  @Response(501, "InternalServerError")
  async login(
    @Body() body: LoginUserInputDTO | unknown
  ): Promise<AuthenticatedUserOutputDTO> {
    const decode = this.validator.decode<LoginUserInputDTO>(
      LoginUserCodec,
      body
    );
    if (!decode.success) throw new InvalidInputError(decode.error);
    const result = await this.loginUserUseCase.execute(decode.data);
    return result;
  }

  /**
   * @summary Get a user by id
   * @param id The user's identifier
   */
  @Get("{id}")
  @SuccessResponse(200)
  @Response(400, "InvalidInputError")
  @Response(404, "NotFoundError")
  @Security("BearerAuth", ["admin"])
  async getById(@Path() id: string): Promise<UserOutputDTO> {
    const result = this.getUserUseCase.execute(id);
    return result;
  }

  /**
   * @summary Get all users
   */
  @Get()
  @SuccessResponse(200)
  @Security("BearerAuth", ["admin"])
  async getAll(): Promise<UserOutputDTO[]> {
    const result = this.getUsersUseCase.execute();
    return result;
  }

  /**
   * @summary Update user profile by id
   * @param id The user's identifier
   */
  @Put("{id}")
  @SuccessResponse(200)
  @Response(400, "InvalidInputError")
  @Response(404, "NotFoundError")
  @Security("BearerAuth", ["admin"])
  async updateProfileById(
    @Body() body: UpdateUserProfileInputDTO | unknown,
    @Path() id: string
  ): Promise<OperationResultOutputDTO> {
    const decode = this.validator.decode<UpdateUserProfileInputDTO>(
      UpdateUserProfileCodec,
      body
    );
    if (!decode.success) throw new InvalidInputError(decode.error);
    const result = this.updateUserProfileUseCase.execute(id, decode.data);
    return result;
  }

  /**
   * @summary Update user password by id
   * @param id The user's identifier
   */
  @Put("{id}/password")
  @SuccessResponse(200)
  @Response(400, "InvalidInputError")
  @Response(404, "NotFoundError")
  @Response(409, "ConflictError")
  @Security("BearerAuth", ["admin"])
  async updatePasswordById(
    @Body() body: UpdateUserPasswordInputDTO | unknown,
    @Path() id: string
  ): Promise<OperationResultOutputDTO> {
    const decode = this.validator.decode<UpdateUserPasswordInputDTO>(
      UpdateUserPasswordCodec,
      body
    );
    if (!decode.success) throw new InvalidInputError(decode.error);
    const result = this.updateUserPasswordUseCase.execute(
      id,
      decode.data.password
    );
    return result;
  }

  /**
   * @summary Delete user by id
   * @param id The user's identifier
   */
  @Delete("{id}")
  @SuccessResponse(200)
  @Response(400, "InvalidInputError")
  @Response(404, "NotFoundError")
  @Security("BearerAuth", ["admin"])
  async deleteById(@Path() id: string): Promise<OperationResultOutputDTO> {
    const result = this.deleteUserUseCase.execute(id);

    return result;
  }
}
