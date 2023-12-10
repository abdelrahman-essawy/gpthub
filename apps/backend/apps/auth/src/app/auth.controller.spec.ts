import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseModule } from '@backend/database';
import { faker } from '@faker-js/faker';

describe('AuthController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [AuthController],
      providers: [AuthService]
    }).compile();
  });

  const user = {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    password: faker.internet.password()
  };

  describe('Register User', () => {
    it('should return user', async () => {
      const authController = app.get<AuthController>(AuthController);
      console.log('Using data: ', user);
      const result = await authController.register(user);
      expect(result).toEqual(
        expect.objectContaining({
          message: 'User has been created successfully',
          userId: expect.any(String)
        })
      );
    });
  });

  describe('Login User', () => {
    it('should return token', () => {
      const authController = app.get<AuthController>(AuthController);
      expect(
        authController.login({
          username: user.username,
          password: user.password
        })
      ).toEqual(
        expect.objectContaining({
          token: expect.any(String)
        })
      );
    });
  });
});
