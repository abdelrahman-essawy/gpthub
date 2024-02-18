import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

import { HashingService, IUser } from '@core';
import { PassableUserEntity, PassableUserTokenPayload } from '@backend/proto';

import { LoginUserDto, RegisterUserDto, UserTokenPayload } from './dto';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/entities/user.entity';
import { FindOptionsWhere } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly hashingService: HashingService,
    private readonly usersService: UsersService,
  ) {}

  async login(user: IUser) {
    const { accessToken, refreshToken } = await this.generateTokens(user);
    const hashedRefreshToken = await this.hashingService.hash(refreshToken);
    await this.usersService.softUpdate(
      { id: user.id },
      {
        hashedRefreshToken,
        lastLogin: new Date(),
      },
    );
    return {
      accessToken,
      hashedRefreshToken,
    };
  }

  async refreshToken(user: IUser, hashedRefreshToken: string) {
    await this.validateRefreshToken(user, hashedRefreshToken);
    return await this.login(user);
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
    return await this.usersService.findByOrFail({ id: userPayload.id });
  }

  async findById(id: string) {
    return await this.usersService.findById(id);
  }

  /**
   * Authenticates a user.
   * @returns A Promise resolving to the authenticated user.
   * @throws NotAcceptableException if the email or username already exists.
   * @param credentials
   */
  async validateUserCredentials(credentials: LoginUserDto) {
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

  async findOneBy(where: FindOptionsWhere<UserEntity>) {
    return await this.usersService.findOneBy(where);
  }

  async addGithubAccount(user: IUser, githubId: string) {
    return await this.usersService.softUpdate(
      { email: user.email },
      { githubId },
    );
  }

  async addGoogleAccount(user: IUser, googleId: string) {
    return await this.usersService.softUpdate(
      { email: user.email },
      { googleId },
    );
  }

  private async validateRefreshToken(user: IUser, hashedRefreshToken: string) {
    const isRefreshTokenValid = await this.hashingService.compare(
      hashedRefreshToken,
      user.hashedRefreshToken,
    );

    if (!isRefreshTokenValid)
      throw new UnauthorizedException({ message: 'Invalid refresh token' });

    return isRefreshTokenValid;
  }

  private async generateTokens(user: IUser) {
    const tokenPayload = new UserTokenPayload(user);
    const accessToken = await this.generateToken(tokenPayload, {
      expiresIn: '15m',
    });
    const refreshToken = await this.generateToken(tokenPayload, {
      expiresIn: '7d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  private async generateToken(payload: object, options?: JwtSignOptions) {
    return this.jwtService.sign({ ...payload }, options);
  }
}
