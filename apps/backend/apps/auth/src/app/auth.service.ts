import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';

import { DatabaseService, HashingService } from '@core';
import { AuthenticateUserDto, CreateUserDto, UpdateUserDto } from '@backend/dtos';
import { JwtService } from '@nestjs/jwt';
import { RegistrationResponse } from '@backend/generated';

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService,
    private readonly hashingService: HashingService
  ) {}

  async commonConflictValidation(
    userDto: CreateUserDto | UpdateUserDto | any // TODO fix any
  ): Promise<void> {
    try {
      const usernamePromise = userDto.username
        ? await this.databaseService.sql.user.isUsernameExists(userDto.username)
        : false;

      const emailPromise = userDto.email
        ? await this.databaseService.sql.user.isEmailExists(userDto.email)
        : false;

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
    userDto.password = await this.hashingService.hash(userDto.password);
    const user = await this.databaseService.sql.user.create(userDto);
    return {
      message: 'User has been created successfully',
      userId: user.id,
    };
  }

  /**
   * Authenticates a user.
   * @returns A Promise resolving to the authenticated user.
   * @throws NotAcceptableException if the email or username already exists.
   * @param credentials
   */
  async authenticate(credentials: AuthenticateUserDto): Promise<any> {
    const user = await this.databaseService.sql.user.findByUsernameOrEmail(
      credentials.usernameOrEmail,
      credentials.usernameOrEmail,
      {
        hideKeysFromReturn: ['__v'],
      }
    );

    if (!user) {
      throw new BadRequestException({ message: 'Invalid credentials' });
    }

    const isPasswordMatched = await this.hashingService.compare(
      credentials.password,
      user.password
    );

    if (!isPasswordMatched) {
      throw new BadRequestException({ message: 'Invalid credentials' });
    }

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      token: this.jwtService.sign({ id: user.id }),
    };
  }
}
