import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { LoginUserDto } from '../dto/login.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      passwordField: 'password',
      usernameField: 'username' || 'email',
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
