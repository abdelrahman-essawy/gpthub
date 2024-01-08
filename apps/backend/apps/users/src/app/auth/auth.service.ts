import { BadRequestException, Injectable } from '@nestjs/common';

import { HashingService } from '@core';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login.dto';
import { UsersService } from '../users.service';

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

    const correctCredentials = await this.hashingService.compare(
      credentials.password,
      user.password,
    );

    if (!correctCredentials) {
      throw new BadRequestException({ message: 'Invalid credentials' });
    }

    return this.jwtService.sign({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    });
  }

  async parseToken(token: string) {
    return this.jwtService.decode(token);
  }
}
