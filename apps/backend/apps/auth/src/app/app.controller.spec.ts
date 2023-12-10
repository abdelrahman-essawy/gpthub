import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();
  });

  describe('Login User', () => {
    it('should return token', () => {
      const appController = app.get<AuthController>(AuthController);
      expect(
        appController.login({
          username: 'test',
          password: 'test',
        })
      ).toEqual(
        expect.objectContaining({
          token: expect.any(String),
        })
      );
    });
  });
});
