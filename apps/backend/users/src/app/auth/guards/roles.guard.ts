import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserRole } from '@core';

import { AuthService } from '../auth.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get(UserRole, context.getHandler());
    const request = GqlExecutionContext.create(context).getContext().req;
    console.log(request);
    return roles.includes(request.user.role); // TODO: refactor this guard
    // return roles.includes(user.role);
  }
}
