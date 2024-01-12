import { BadRequestException, Injectable } from '@nestjs/common';

import { HashingService } from '@core';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { UserDto } from '../users/dto/user.dto';
import { isUUID } from 'class-validator';
import { RegisterUserDto } from './dto/register.dto';

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
  async login(credentials: LoginUserDto) {
    const user = await this.usersService.findByUsernameOrEmail(
      credentials.username,
      credentials.email,
    );

    if (!user) throw new BadRequestException({ message: 'User not found' });

    const isCredentialsCorrect = await this.hashingService.compare(
      credentials.password,
      user.password,
    );

    if (!isCredentialsCorrect)
      throw new BadRequestException({ message: 'Invalid credentials' });

    return user;
  }

  /**
   * Registers a user.
   * @param UserInfo The user's information.
   */
  async register(UserInfo: RegisterUserDto) {
    return await this.usersService.createOne(UserInfo);
  }

  async generateToken(
    payload: object,
    options?: Omit<JwtSignOptions, keyof JwtSignOptions> | undefined,
  ) {
    return this.jwtService.sign(payload, options);
  }

  async parseUserFromToken(token: string) {
    const tokenPayload = await this.parseToken(token);
    console.log(tokenPayload);

    const user = new UserDto(tokenPayload);
    if (!user?.id) throw new Error('Invalid token payload, no id present');
    if (!isUUID(user.id))
      throw new Error('Invalid token payload, id is not a valid');

    return user;
  }

  private parseToken(token: string) {
    return this.jwtService.decode(token);
  }
}
