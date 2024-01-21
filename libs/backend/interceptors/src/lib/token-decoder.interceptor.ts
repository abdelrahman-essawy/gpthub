import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

import {
  extractTokenFromRequest,
  isUserTokenPayloadValid,
  setHeadersInRequest,
} from '@backend/utilities';
import { IUserTokenPayload } from '@core';

@Injectable()
export class ParseUserFromToken implements NestInterceptor {
  constructor(private readonly jwtService: JwtService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const token = extractTokenFromRequest(context);

    if (token) {
      const user: IUserTokenPayload = this.jwtService.decode(token);
      console.log(user);
      isUserTokenPayloadValid(user);
      setHeadersInRequest(context, { user });
    }

    return next.handle();
  }
}
