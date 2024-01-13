import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get(UserRole, context.getHandler());
    const request = GqlExecutionContext.create(context).getContext().req;
    const token = AuthGuard.extractTokenFromRequest(request);
    const user = await this.authService.parseUserFromToken(token);
    return roles.includes(user.role);
  }
}
