import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseModule } from '@backend/database';
import { faker } from '@faker-js/faker';
import { JwtModule } from '@nestjs/jwt';
import { HashingModule } from '@backend/hashing';
import process from 'process';

describe('AuthController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        JwtModule.register({
          secret: process.env.JWT_ACCESS_SECRET,
          signOptions: { expiresIn: '3600s' },
        }),
        HashingModule,
      ],
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();
  });

  const mockUser = {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    password: faker.internet.password(),
  };

  describe('Register User', () => {
    it('should return user', async () => {
      const authController = app.get<AuthController>(AuthController);
      console.log('Using data: ', mockUser);
      const result = await authController.register({
        username: mockUser.username,
        email: mockUser.email,
        firstName: mockUser.firstName,
        lastName: mockUser.lastName,
        password: mockUser.password,
      });
      expect(result).toEqual(
        expect.objectContaining({
          message: 'User has been created successfully',
          userId: expect.any(String),
        }),
      );
    });
  });

  describe('Login User with username', () => {
    it('should return token', async () => {
      const authController = app.get<AuthController>(AuthController);
      console.log('Using data: ', mockUser);
      const result = await authController.login({
        usernameOrEmail: mockUser.username,
        password: mockUser.password,
      });
      expect(result).toEqual(
        expect.objectContaining({
          token: expect.any(String),
        }),
      );
    });
  });

  describe('Login User with email', () => {
    it('should return token', async () => {
      const authController = app.get<AuthController>(AuthController);
      expect(
        await authController.login({
          usernameOrEmail: mockUser.email,
          password: mockUser.password,
        }),
      ).toEqual(
        expect.objectContaining({
          token: expect.any(String),
        }),
      );
    });
  });
});
