import {
  LoginResponse,
  LoginUserDto,
} from '../../../../../../../../libs/backend/dto/auth/login.dto';
import { UserDto } from '../../../../../../../../libs/backend/dto/user/user.dto';
import { UserRole } from '@core';
import { AuthResolver } from '../auth.resolver';

it('should authenticate a user with valid credentials and return a JWT token', async () => {
  // Arrange
  const credentials: LoginUserDto = {
    email: 'test@example.com',
    password: 'password123',
  };
  const user: UserDto = {
    id: '1',
    username: 'testuser',
    email: 'test@example.com',
    role: UserRole.USER,
    firstName: 'Test',
    lastName: 'User',
    verified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const token = 'jwt_token';

  const authServiceMock = {
    login: jest.fn().mockResolvedValue(user),
    generateToken: jest.fn().mockResolvedValue(token),
  };

  const authResolver = new AuthResolver(authServiceMock as any, {} as any);

  // Act
  const result = await authResolver.login(credentials);

  // Assert
  expect(authServiceMock.login).toHaveBeenCalledWith(credentials);
  expect(authServiceMock.generateToken).toHaveBeenCalledWith({
    tokenPayload: user,
  });
  expect(result).toEqual(new LoginResponse(token));
});
