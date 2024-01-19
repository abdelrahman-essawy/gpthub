import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

const extractTokenFromRequest = (ctx: ExecutionContext): string => {
  const ctxGql = GqlExecutionContext.create(ctx);
  const request = ctxGql.getContext().req;
  const authorizationHeader = request.headers.authorization;

  if (!authorizationHeader) {
    throw new UnauthorizedException();
  }

  return authorizationHeader.replace('Bearer ', '');
};

export const CatchToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => extractTokenFromRequest(ctx),
);

export const ParseToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => extractTokenFromRequest(ctx),
);
