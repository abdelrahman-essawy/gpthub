import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { IUserTokenPayload } from '@core';
import { Request } from 'express';
import { InternalCommunicationsService } from '@backend/internal-communications';
import { lastValueFrom } from 'rxjs';

export const cookieAccessExtractor = (req: Request): string | null => {
  if (!req.cookies) return null;

  if (req.cookies['accessToken']) {
    console.log('req.cookies', req.cookies['accessToken']);
    return req.cookies['accessToken'].replace('Bearer ', '').trim();
  }
  return null;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly authService =
    this.internalCommunicationsService.grpc.authService;

  constructor(
    readonly internalCommunicationsService: InternalCommunicationsService,
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

  async validate(payload: IUserTokenPayload) {
    return lastValueFrom(this.authService.me(payload)).catch(() => {
      throw new UnauthorizedException('Invalid token. Please log in again.');
    });
  }
}
