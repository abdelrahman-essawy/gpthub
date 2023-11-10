import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { IDatabaseService } from 'src/core/abstracts/services/database-services.abstract';
import { CreateUserDto, UpdateUserDto } from 'src/core/dtos/user.dto';

@Injectable()
export class UserUseCases {
  constructor(private readonly databaseService: IDatabaseService) {}

  /**
   * Retrieves all users.
   * @returns A Promise resolving to all user data.
   */
  async getAllUsers(): Promise<any[]> {
    return this.databaseService.users.find();
  }

  /**
   * Retrieves a user by ID.
   * @param id - The ID of the user to retrieve.
   * @returns A Promise resolving to the user data.
   * @throws NotAcceptableException if the user is not found.
   */
  async getUserById(id: string): Promise<any> {
    const user = this.databaseService.users.findOneById(id);
    if (!user) {
      throw new NotFoundException({ message: 'User not found' });
    }
    return user;
  }

  /**
   * Creates a new user.
   * @param createUserDto - User data to create a new user.
   * @returns A Promise resolving to the created user.
   * @throws NotAcceptableException if the email or username already exists.
   */
  async createUser(createUserDto: CreateUserDto): Promise<any> {
    if (await this.databaseService.users.isEmailExists(createUserDto.email)) {
      throw new NotAcceptableException({ message: 'Email already exists' });
    }
    if (
      await this.databaseService.users.isUsernameExists(createUserDto.username)
    ) {
      throw new NotAcceptableException({ message: 'Username already exists' });
    }
    return this.databaseService.users.create(createUserDto);
  }

  /**
   * Updates a user by ID.
   * @param id - The ID of the user to update.
   * @param updateUserDto - User data for the update.
   * @returns A Promise indicating successful update.
   * @throws NotAcceptableException if the email or username already exists.
   */
  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<any> {
    try {
      if (await this.databaseService.users.isEmailExists(updateUserDto.email)) {
        throw new NotAcceptableException({ message: 'Email already exists' });
      }
      if (
        await this.databaseService.users.isUsernameExists(
          updateUserDto.username,
        )
      ) {
        throw new NotAcceptableException({
          message: 'Username already exists',
        });
      }
      return this.databaseService.users.update(id, updateUserDto);
    } catch (error) {
      throw new NotAcceptableException({ message: 'User not found' });
    }
  }

  /**
   * Deletes a user by ID.
   * @param id - The ID of the user to delete.
   * @returns A Promise indicating successful deletion.
   */
  async deleteUser(id: string): Promise<any> {
    return this.databaseService.users.delete(id);
  }

  /**
   * Deletes all users.
   * @returns A Promise indicating successful deletion of all users.
   */
  async deleteAllUsers(): Promise<any> {
    return this.databaseService.users.deleteAll();
  }

  /**
   * Search for users based on a query.
   * @param query - The search query.
   * @returns A Promise resolving to an array of users matching the query.
   */
  async search(query: string): Promise<any[]> {
    return this.databaseService.users.search(query);
  }

  /**
   * Count the total number of users.
   * @returns A Promise resolving to the total count of users.
   */
  async count(): Promise<number> {
    return this.databaseService.users.count();
  }

  /**
   * Retrieves active users.
   * @returns A Promise resolving to active user data.
   *
   * @description
   * Method retrieves users who are marked as active.
   */
  // async getActiveUsers(): Promise<any[]> {
  //   // Assuming there is a method 'getActiveUsers' in the databaseService.
  //   return this.databaseService.users.getActiveUsers();
  // }
}
