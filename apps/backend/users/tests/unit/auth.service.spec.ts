import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { HashingService } from '@core';
import { AuthService } from '../../src/app/auth/auth.service';
import { UsersService } from '../../src/app/users/users.service';
import { UserEntity } from '../../src/app/users/entities/user.entity';
import {
  accessToken,
  refreshToken,
  userInDatabase,
} from './mocks/login-responce.mocks';
import { faker } from '@faker-js/faker';
import { goodLoginData } from './mocks/login.mocks';
import { goodRegisterData } from './mocks/register.mocks';
import { invalidRefreshToken } from './mocks/invalid.mocks';
import { LoginUserDto } from '../../src/app/auth/dto';

describe('AuthService', () => {
  let authService: AuthService;
  let hashingService: HashingService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue(faker.string.alphanumeric(20)),
          },
        },
        {
          provide: HashingService,
          useValue: {
            compare: jest.fn().mockReturnValue(true),
            hash: jest.fn().mockReturnValue(faker.string.alphanumeric(20)),
          },
        },
        {
          provide: UsersService,
          useValue: {
            findByUsernameOrEmailOrFail: jest.fn(),
            updateRefreshToken: jest.fn(),
            createOne: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    hashingService = module.get<HashingService>(HashingService);
    usersService = module.get<UsersService>(UsersService);
  });

  describe('validate user with email or username and password', () => {
    it('should validate user credentials', async () => {
      const credentialsWithEmail: LoginUserDto = {
        email: userInDatabase.email,
        password: userInDatabase.password,
      };
      const credentialsWithUsername: LoginUserDto = {
        username: userInDatabase.username,
        password: userInDatabase.password,
      };

      jest
        .spyOn(usersService, 'findByUsernameOrEmailOrFail')
        .mockResolvedValue(userInDatabase as UserEntity);

      const resultFromEmail =
        await authService.validateUserCredentials(credentialsWithEmail);
      const resultFromUsername = await authService.validateUserCredentials(
        credentialsWithUsername,
      );

      expect(resultFromEmail).toEqual(userInDatabase);
      expect(resultFromUsername).toEqual(userInDatabase);
    });

    it('should throw UnauthorizedException for invalid credentials', async () => {
      jest
        .spyOn(usersService, 'findByUsernameOrEmailOrFail')
        .mockResolvedValue(userInDatabase as UserEntity);

      jest.spyOn(hashingService, 'compare').mockResolvedValue(false);

      await expect(
        authService.validateUserCredentials(goodLoginData),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('login', () => {
    it('should generate tokens and update refresh token for a user', async () => {
      // jest.spyOn(usersService, 'updateRefreshToken').mockResolvedValue();

      const result = await authService.login(userInDatabase);

      expect(result.accessToken).toBeDefined();
      expect(result.refreshToken).toBeDefined();
    });
  });

  describe('refreshToken', () => {
    it('should refresh tokens for a user with a valid refresh token', async () => {
      jest.spyOn(hashingService, 'compare').mockResolvedValue(true);
      jest.spyOn(authService, 'login').mockResolvedValue({
        accessToken,
        refreshToken,
      });

      const result = await authService.refreshToken(
        userInDatabase,
        refreshToken,
      );

      expect(result).toEqual({
        accessToken,
        refreshToken,
      });
    });

    it('should throw UnauthorizedException for invalid refresh token', async () => {
      jest.spyOn(hashingService, 'compare').mockResolvedValue(false);
      await expect(
        authService.refreshToken(userInDatabase, invalidRefreshToken),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('register', () => {
    it('should register a new user', async () => {
      jest
        .spyOn(usersService, 'createOne')
        .mockResolvedValue(userInDatabase as UserEntity);

      const result = await authService.register(goodRegisterData);

      expect(result).toEqual(userInDatabase);
    });
  });
});
