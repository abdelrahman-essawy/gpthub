import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

import { HashingService, IUser, IUserTokenPayload } from '@core';
import {
  LoginUserDto,
  RegisterUserDto,
  UserTokenPayload,
} from '@backend/dtos/auth';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly hashingService: HashingService,
    @Inject('USERS_SERVICE') private readonly usersService: any,
  ) {
    console.log('this.usersService', this.usersService);
  }

  /**
   * Authenticates a user.
   * @returns A Promise resolving to the authenticated user.
   * @throws NotAcceptableException if the email or username already exists.
   * @param credentials
   */
  async validateUser(credentials: LoginUserDto) {
    const user = await this.usersService.findByUsernameOrEmailOrFail(
      credentials.username,
      credentials.email,
    );

    const isCredentialsCorrect = await this.hashingService.compare(
      credentials.password,
      user.password,
    );

    if (!isCredentialsCorrect)
      throw new UnauthorizedException({ message: 'Invalid credentials' });

    return user;
  }

  async login(user: IUser) {
    const tokens = await this.generateTokens(user);
    await this.usersService.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async refreshToken(user: IUser, refreshToken: string) {
    const isRefreshTokenValid = await this.hashingService.compare(
      refreshToken,
      user.hashedRefreshToken,
    );

    if (!isRefreshTokenValid)
      throw new UnauthorizedException({ message: 'Invalid refresh token' });

    return this.login(user);
  }

  /**
   * Registers a user.
   * @param UserInfo The user's information.
   */
  async register(UserInfo: RegisterUserDto) {
    return await this.usersService.createOne(UserInfo);
  }

  async me(userPayload: IUserTokenPayload): Promise<IUser> {
    return await this.usersService.findOne(userPayload).toPromise();
  }

  private async generateTokens(user: IUser) {
    const tokenPayload = new UserTokenPayload(user);
    const accessToken = await this.generateToken(tokenPayload, {
      expiresIn: '15m',
    });
    const refreshToken = await this.generateToken(tokenPayload, {
      expiresIn: '7d',
    });
    return { accessToken, refreshToken };
  }

  private async generateToken(payload: object, options?: JwtSignOptions) {
    return this.jwtService.sign({ ...payload }, options);
  }
}
