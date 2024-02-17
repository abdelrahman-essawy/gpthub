import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export class LocalGuard extends AuthGuard('local') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const gqlReq = ctx.getContext().req;
    const {
      credentials: { email, password, username },
    } = ctx.getArgs();
    gqlReq.body.identifier = email || username;
    gqlReq.body.password = password;
    return gqlReq;
  }
}
