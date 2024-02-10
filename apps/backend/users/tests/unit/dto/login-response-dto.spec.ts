import { LoginResponseDto } from '../../../src/app/auth/dto';
import { userInDatabase } from '../mocks/login-responce-mocks';

describe('LoginResponseDto', () => {
  const accessToken = 'testAccessToken';
  const refreshToken = 'testRefreshToken';

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
