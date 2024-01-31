import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { IUserTokenPayload } from '@core';
import { Request } from 'express';
import { ClientGrpc } from '@nestjs/microservices';

export const cookieAccessExtractor = (req: Request): string | null => {
  if (!req.cookies) return null;

  if (req.cookies['accessToken']) {
    console.log('req.cookies', req.cookies['accessToken']);
    return req.cookies['accessToken'].replace('Bearer ', '').trim();
  }
  return null;
};

@Injectable()
export class JwtStrategy
  extends PassportStrategy(Strategy)
  implements OnModuleInit
{
  private authService: any;

  constructor(
    @Inject('AUTH_PACKAGE') private client: ClientGrpc,
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

  onModuleInit() {
    this.authService = this.client.getService('AuthService');
  }

  async validate(payload: IUserTokenPayload) {
    return this.authService.me(payload).toPromise();
  }
}
