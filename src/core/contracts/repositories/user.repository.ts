import { CreateUserInputDTO } from "../../../application/DTOs/user/input/create-user.dto";
import { UpdateUserInputDTO } from "../../../application/DTOs/user/input/update-user.dto";
import { User } from "../../domain/entities/user.entity";

/**
 * IUserRepository defines the contract for user data access operations.
 * This abstraction allows decoupling between the domain logic and the persistence layer.
 */
export interface IUserRepository {
  /**
   * Creates a new user in the data source.
   * 
   * @param data - A partial User object containing fields to initialize the user.
   * @returns A Promise that resolves to the created User entity.
   */
  create(data: CreateUserInputDTO): Promise<User>;

  /**
   * Retrieves a user by its unique identifier.
   * 
   * @param id - The user's unique identifier.
   * @returns A Promise that resolves to the User entity if found, or null otherwise.
   */
  findById(id: string): Promise<User | null>;

  /**
   * Retrieves all users from the data source.
   * 
   * @returns A Promise that resolves to an array of User entities.
   */
  findAll(): Promise<User[]>;

  /**
   * Updates an existing user identified by its unique ID.
   * 
   * @param id - The ID of the user to be updated.
   * @param data - A partial User object containing the updated fields.
   * @returns A Promise that resolves to the updated User entity.
   */
  update(id: string, data:UpdateUserInputDTO ): Promise<User>;

  /**
   * Deletes a user by its unique identifier.
   * 
   * @param id - The ID of the user to delete.
   * @returns A Promise that resolves when the operation is complete.
   */
  delete(id: string): Promise<void>;
}
