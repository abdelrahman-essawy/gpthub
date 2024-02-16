import { faker } from '@faker-js/faker';
import { LoginResponseDto } from '../../../src/app/auth/dto';
import { userInDatabase } from '../mocks/login-responce-mocks';

describe('LoginResponseDto', () => {
  const accessToken = faker.string.alphanumeric(20);
  const refreshToken = faker.string.alphanumeric(20);

  it('should create a new instance of LoginResponseDto with valid input', () => {
    const loginResponseDto: LoginResponseDto = new LoginResponseDto(
      userInDatabase,
      accessToken,
      refreshToken,
    );
    expect(loginResponseDto).toBeDefined();
  });

  it('should populate all fields correctly with valid input', () => {
    const loginResponseDto: LoginResponseDto = new LoginResponseDto(
      userInDatabase,
      accessToken,
      refreshToken,
    );
    expect(loginResponseDto.accessToken).toEqual(accessToken);
    expect(loginResponseDto.refreshToken).toEqual(refreshToken);
    expect(loginResponseDto.user).toEqual(
      expect.objectContaining(userInDatabase),
    );
  });
});
