import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../app/auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'usernameOrEmail',
    });
  }

  async validate(usernameOrEmail: string, password: string): Promise<any> {
    const user = await this.authService.authenticate({
      usernameOrEmail,
      password,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
