import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { DatabaseService } from '@core';
import { CreateUserDto, UpdateUserDto } from '@backend/dtos';
import { RegistrationResponse } from '@global/proto';

@Injectable()
export class AuthService {
  constructor(private readonly databaseService: DatabaseService) {}

  async commonConflictValidation(
    userDto: CreateUserDto | UpdateUserDto
  ): Promise<void> {
    let emailPromise: boolean = false;
    try {
      const usernamePromise = userDto.username
        ? await this.databaseService.sql.user.isUsernameExists(userDto.username)
        : false;

      if (userDto instanceof CreateUserDto) {
        emailPromise = userDto.email
          ? await this.databaseService.sql.user.isEmailExists(userDto.email)
          : false;
      }

      const [isUsernameExists, isEmailExists] = await Promise.all([
        usernamePromise,
        emailPromise,
      ]);

      if (isUsernameExists && isEmailExists) {
        throw new ConflictException({
          message: 'Username and email already exists',
        });
      }

      if (isUsernameExists) {
        throw new ConflictException({ message: 'Username already exists' });
      }

      if (isEmailExists) {
        throw new ConflictException({ message: 'Email already exists' });
      }
    } catch (error) {
      throw new BadRequestException({ message: error.message });
    }
  }

  async register(userDto: CreateUserDto): Promise<RegistrationResponse> {
    await this.commonConflictValidation(userDto);
    const user = await this.databaseService.sql.user.create(userDto);
    return {
      message: 'User has been created successfully',
      userId: user.id,
    };
  }
}
