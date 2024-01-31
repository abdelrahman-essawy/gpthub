import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HashingService, IUser, UserRole } from '@core';
import { LoginUserDto, RegisterUserDto } from '@backend/dtos/auth';
import { AuthService } from '../auth.service';
import { UsersService } from '../../../../../users/src/app/users/users.service';
import { UserEntity } from '../../../../../users/src/app/users/entities/user.entity';

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
            sign: jest.fn(),
          },
        },
        {
          provide: HashingService,
          useValue: {
            compare: jest.fn(),
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
        email: 'test@example.com',
        password: 'password123',
      };
      const credentialsWithUsername: LoginUserDto = {
        username: 'testuser',
        password: 'password123',
      };

      const user: IUser = {
        id: '1',
        username: 'testuser',
        email: 'test@example.com',
        password: 'hashedpassword',
        verified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        firstName: 'test',
        role: UserRole.USER,
        lastName: 'user',
        birthday: new Date(),
        hashedRefreshToken: 'hashedRefreshToken',
      };

      jest
        .spyOn(usersService, 'findByUsernameOrEmailOrFail')
        .mockResolvedValue(user as UserEntity);

      jest.spyOn(hashingService, 'compare').mockResolvedValue(true);

      const resultFromEmail =
        await authService.validateUser(credentialsWithEmail);
      const resultFromUsername = await authService.validateUser(
        credentialsWithUsername,
      );

      expect(resultFromEmail).toEqual(user);
      expect(resultFromUsername).toEqual(user);
    });

    it('should throw UnauthorizedException for invalid credentials', async () => {
      const credentials: LoginUserDto = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'invalidpassword',
      };

      const user = {
        id: '1',
        username: 'testuser',
        email: 'test@example.com',
        password: 'hashedpassword',
        verified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        firstName: 'test',
        role: UserRole.USER,
        lastName: 'user',
        birthday: new Date(),
        hashedRefreshToken: 'hashedRefreshToken',
      };

      jest
        .spyOn(usersService, 'findByUsernameOrEmailOrFail')
        .mockResolvedValue(user as UserEntity);

      jest.spyOn(hashingService, 'compare').mockResolvedValue(false);

      await expect(authService.validateUser(credentials)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('login', () => {
    it('should generate tokens and update refresh token for a user', async () => {
      const user: IUser = {
        id: '1',
        username: 'testuser',
        email: 'test@example.com',
        password: 'hashedpassword',
        verified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        firstName: 'test',
        role: UserRole.USER,
        lastName: 'user',
        birthday: new Date(),
        hashedRefreshToken: 'hashedRefreshToken',
      };

      jest.spyOn(authService, 'login').mockResolvedValue({
        accessToken: 'fakeAccessToken',
        refreshToken: 'fakeRefreshToken',
      });

      jest.spyOn(usersService, 'updateRefreshToken').mockResolvedValue();

      const result = await authService.login(user);

      expect(result).toEqual({
        accessToken: 'fakeAccessToken',
        refreshToken: 'fakeRefreshToken',
      });
    });
  });

  describe('refreshToken', () => {
    it('should refresh tokens for a user with a valid refresh token', async () => {
      const user: IUser = {
        id: '1',
        username: 'testuser',
        email: 'test@example.com',
        password: 'hashedpassword',
        verified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        firstName: 'test',
        role: UserRole.USER,
        lastName: 'user',
        birthday: new Date(),
        hashedRefreshToken: 'hashedRefreshToken',
      };

      const refreshToken = 'hashedRefreshToken';

      jest.spyOn(hashingService, 'compare').mockResolvedValue(true);
      jest.spyOn(authService, 'login').mockResolvedValue({
        accessToken: 'fakeAccessToken',
        refreshToken: 'fakeRefreshToken',
      });

      const result = await authService.refreshToken(user, refreshToken);

      expect(result).toEqual({
        accessToken: 'fakeAccessToken',
        refreshToken: 'fakeRefreshToken',
      });
    });

    it('should throw UnauthorizedException for invalid refresh token', async () => {
      const user: IUser = {
        id: '1',
        username: 'testuser',
        email: 'test@example.com',
        password: 'hashedpassword',
        verified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        firstName: 'test',
        role: UserRole.USER,
        lastName: 'user',
        birthday: new Date(),
        hashedRefreshToken: 'hashedRefreshToken',
      };

      const refreshToken = 'invalidRefreshToken';

      jest.spyOn(hashingService, 'compare').mockResolvedValue(false);

      await expect(
        authService.refreshToken(user, refreshToken),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const userInfo: RegisterUserDto = {
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'newpassword',
        firstName: 'new',
        lastName: 'user',
        birthday: new Date(),
      };

      const createdUser: IUser = {
        id: '2',
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'hashedpassword',
        verified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        firstName: 'new',
        role: UserRole.USER,
        lastName: 'user',
        birthday: new Date(),
        hashedRefreshToken: 'hashedRefreshToken',
      };

      jest
        .spyOn(usersService, 'createOne')
        .mockResolvedValue(createdUser as UserEntity);

      const result = await authService.register(userInfo);

      expect(result).toEqual(createdUser);
    });
  });
});
