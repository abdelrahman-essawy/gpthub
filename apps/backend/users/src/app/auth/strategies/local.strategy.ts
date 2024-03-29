import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'identifier',
      passwordField: 'password',
    });
  }

  async validate(identifier: string, password: string) {
    const user = await this.authService.validateUserCredentials({
      username: identifier,
      email: identifier,
      password,
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
