import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';
import { IUserTokenPayload } from '@core';
import { Request } from 'express';

export const cookieAccessExtractor = (req: Request): string | null => {
  if (req.cookies['accessToken']) {
    console.log('req.cookies', req.cookies['accessToken']);
    return req.cookies['accessToken'].replace('Bearer ', '').trim();
  }
  return null;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        cookieAccessExtractor,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: true, // TODO: set to false
      secretOrKey: configService.get<string>('JWT_ACCESS_SECRET'),
    });
  }

  async validate(user: IUserTokenPayload) {
    return await this.usersService.findById(user.id);
  }
}
