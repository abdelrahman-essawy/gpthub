import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const ctxGql = GqlExecutionContext.create(ctx);
    const request = ctxGql.getContext().req;
    return request.user;
  },
);
