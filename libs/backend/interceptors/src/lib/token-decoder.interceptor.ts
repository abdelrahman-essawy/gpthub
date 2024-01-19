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
  setHeadersInRequest,
} from '@backend/utilities';

@Injectable()
export class ParseUserFromToken implements NestInterceptor {
  constructor(private readonly jwtService: JwtService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const token = extractTokenFromRequest(context);

    if (token) {
      const user = this.jwtService.decode(token);
      setHeadersInRequest(context, { user });
    }

    return next.handle();
  }
}
