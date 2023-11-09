import { Injectable } from '@nestjs/common';
import { IDatabaseService } from 'src/core/abstracts/data-service.abstract';
import { CreateUserDto } from 'src/core/dtos/user.dto';

@Injectable()
export class UserUseCases {
  constructor(private readonly databaseService: IDatabaseService) { }

  /**
   * Retrieves all users.
   * @returns A Promise resolving to all user data.
   */
  async getAllUsers(): Promise<any> {
    return this.databaseService.users.getAll();
  }

  /**
   * Retrieves a user by ID.
   * @param id - The ID of the user to retrieve.
   * @returns A Promise resolving to the user data.
   */
  async getUserById(id: string): Promise<any> {
    return this.databaseService.users.getOne(id);
  }

  /**
   * Creates a new user.
   * @param createUserDto - User data to create a new user.
   * @returns A Promise resolving to the created user.
   */
  async createUser(createUserDto: CreateUserDto): Promise<any> {
    return this.databaseService.users.create(createUserDto);
  }

  /**
   * Updates a user by ID.
   * @param id - The ID of the user to update.
   * @param createUserDto - User data for the update.
   * @returns A Promise indicating successful update.
   */
  async updateUser(id: string, createUserDto: CreateUserDto): Promise<any> {
    return this.databaseService.users.update(id, createUserDto);
  }

  /**
   * Deletes a user by ID.
   * @param id - The ID of the user to delete.
   * @returns A Promise indicating successful deletion.
   */
  async deleteUser(id: string): Promise<any> {
    return this.databaseService.users.delete(id);
  }

  async deleteAllUsers(): Promise<any> {
    return this.databaseService.users.deleteAll();
  }

  async search(query: string): Promise<any[]> {
    // console.log('query', query);
    return this.databaseService.users.search(query);
  }

  async count(): Promise<number> {
    return this.databaseService.users.count();
  }
}
