import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

import { HashingService, IUser } from '@core';
import { PassableUserEntity, PassableUserTokenPayload } from '@backend/proto';

import { LoginUserDto, RegisterUserDto, UserTokenPayload } from './dto';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly hashingService: HashingService,
    private readonly usersService: UsersService,
  ) {}

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

  async me(
    userPayload: UserTokenPayload | PassableUserTokenPayload,
  ): Promise<UserEntity | PassableUserEntity> {
    return await this.usersService.findById(userPayload.id);
  }

  async findById(id: string) {
    return await this.usersService.findById(id);
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
