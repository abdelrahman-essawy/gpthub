import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { LoginUserDto } from '@backend/dto/auth';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      passwordField: 'password',
      usernameField: 'username',
    });
  }

  async validate(credentials: LoginUserDto) {
    console.log('this', credentials);
    const user = await this.authService.login(credentials);
    console.log(user);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
