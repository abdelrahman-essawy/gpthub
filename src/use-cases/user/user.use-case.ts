import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  DatabaseServices,
  IPrismaDatabaseService,
} from 'src/core/abstracts/services/database-service.abstract';
import { IHashingService } from 'src/core/abstracts/services/hashing.abstract';
import {
  AuthenticateUserDto,
  CreateUserDto,
  UpdateUserDto,
} from 'src/core/dtos/user.dto';
import { UserDocument } from 'src/frameworks/databases/mongo/model/user.model';
import { PrismaDatabaseService } from 'src/frameworks/databases/prisma/prisma-database.service';
import { DatabaseServicesModule } from 'src/services/databases/databases-service.module';

@Injectable()
export class UserUseCases {
  async commonConflictValidation(
    userDto: CreateUserDto | Partial<UpdateUserDto>,
  ) {
    try {
      if (
        userDto.username &&
        (await this.databaseService.sql.user.isUsernameExists(userDto.username))
      ) {
        throw new ConflictException({
          message: 'Username already exists',
        });
      }

      if (
        userDto.email &&
        (await this.databaseService.sql.user.isEmailExists(userDto.email))
      ) {
        throw new ConflictException({ message: 'Email already exists' });
      }
      // if (userDto.password) {
      //   userDto.password = await this.hashingService.hash(userDto.password);
      // }
    } catch (error) {
      throw new BadRequestException({ message: error.message });
    }
  }
  constructor(
    private readonly databaseService: DatabaseServices,
    private readonly hashingService: IHashingService,
  ) {
    console.log('UserUseCases initialized');
    // console.log(databaseService.sql.user.count());
  }

  /**
   * Retrieves all users.
   * @returns A Promise resolving to all user data.
   */
  async getAllUsers(): Promise<any[]> {
    const sql = await this.databaseService.sql.user.find({
      hideKeysFromReturn: ['password', '__v'],
    });

    const nosql = await this.databaseService.nosql.user.find({
      hideKeysFromReturn: ['password', '__v'],
    });

    return [...sql, ...nosql];
  }

  /**
   * Retrieves a user by ID.
   * @param id - The ID of the user to retrieve.
   * @returns A Promise resolving to the user data.
   * @throws NotAcceptableException if the user is not found.
   */
  async getUserById(id: string) {
    const user = this.databaseService.sql.user.findOneById(id, {
      hideKeysFromReturn: ['password', '__v'],
    });
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
  async register(createUserDto: CreateUserDto): Promise<any> {
    await this.commonConflictValidation(createUserDto);
    const user = this.databaseService.sql.user.create({
      ...createUserDto,
      password: await this.hashingService.hash(createUserDto.password),
    });

    if (!user) {
      throw new BadRequestException({ message: 'User not created' });
    }

    return {
      message: 'User created successfully',
      token: 'token',
    };
  }

  /**
   * Authenticates a user.
   * @param createUserDto - User data to authenticate a user.
   * @returns A Promise resolving to the authenticated user.
   * @throws NotAcceptableException if the email or username already exists.
   */
  async authenticate(credentials: AuthenticateUserDto): Promise<any> {
    const user = await this.databaseService.sql.user.findByUsernameOrEmail(
      credentials.usernameOrEmail,
    );

    if (!user) {
      throw new BadRequestException({ message: 'Invalid credentials' });
    }

    const isPasswordMatched = await this.hashingService.compare(
      credentials.password,
      user.password,
    );

    if (!isPasswordMatched) {
      throw new BadRequestException({ message: 'Invalid credentials' });
    }

    return ['token'];
  }

  /**
   * Updates a user by ID.
   * @param id - The ID of the user to update.
   * @param updateUserDto - User data for the update.
   * @returns A Promise indicating successful update.
   * @throws NotAcceptableException if the email or username already exists.
   */
  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<any> {
    console.log('updateUser');
    await this.commonConflictValidation(updateUserDto);
    const updatedUser = this.databaseService.sql.user.update(
      id,
      updateUserDto,
      {
        hideKeysFromReturn: ['password', '__v'],
      },
    );
    console.log('updatedUser', updatedUser);
    if (!updatedUser) {
      throw new BadRequestException({ message: 'User not updated' });
    }
    return {
      message: 'User updated successfully',
      data: await updatedUser,
    };
  }

  /**
   * Deletes a user by ID.
   * @param id - The ID of the user to delete.
   * @returns A Promise indicating successful deletion.
   */
  async deleteUser(id: string): Promise<any> {
    if (!(await this.databaseService.sql.user.findOneById(id, {}))) {
      throw new NotFoundException({ message: 'User not found' });
    }
    try {
      await this.databaseService.sql.user.delete(id);
    } catch (error) {
      throw new BadRequestException({ message: error.message });
    }
    return {
      message: 'User deleted successfully',
    };
  }

  /**
   * Deletes all users.
   * @returns A Promise indicating successful deletion of all users.
   */
  async deleteAllUsers(): Promise<any> {
    return this.databaseService.sql.user.deleteAll();
  }

  /**
   * Search for users based on a query.
   * @param query - The search query.
   * @returns A Promise resolving to an array of users matching the query.
   */
  async search(query: string): Promise<any[]> {
    return this.databaseService.sql.user.search(query);
  }

  /**
   * Count the total number of users.
   * @returns A Promise resolving to the total count of users.
   */
  async count(): Promise<number> {
    return this.databaseService.sql.user.count();
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
  //
  //
  /**
   * Change User Password
   * @param id - The ID of the user to update.
   * @param oldPassword - Old Password
   * @param newPassword - New Password
   * @returns A Promise indicating successful update.
   */
  async changePassword(id: string, oldPassword: string, newPassword: string) {
    const user = await this.databaseService.sql.user.findOneById(id);
    const isPasswordMatched = await this.hashingService.compare(
      oldPassword,
      user.password,
    );

    if (!isPasswordMatched) {
      throw new BadRequestException({ message: 'Invalid credentials' });
    }

    const isPreviousPassword = await this.hashingService.compare(
      newPassword,
      user.password,
    );

    if (isPreviousPassword) {
      throw new BadRequestException({
        message: 'New password cannot be the same as the old password',
      });
    }

    await this.databaseService.sql.user.update(id, {
      password: await this.hashingService.hash(newPassword),
    });

    return {
      message: 'Password updated successfully',
    };
  }
}
