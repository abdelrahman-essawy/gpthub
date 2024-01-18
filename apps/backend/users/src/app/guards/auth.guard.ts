import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  static extractTokenFromRequest(
    req: Request & {
      headers: {
        authorization: string | undefined;
      };
    },
  ): string | undefined {
    const authorization = req.headers.authorization;
    if (!authorization) {
      console.log('no authorization');
      return undefined;
    }
    const [type, token] = authorization.split(' ');
    return type === 'Bearer' ? token : undefined;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    const token = AuthGuard.extractTokenFromRequest(req);

    if (!token) {
      console.log('no token');
      throw new UnauthorizedException();
    }

    try {
      req.user = await this.authService.parseUserFromToken(token);
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
