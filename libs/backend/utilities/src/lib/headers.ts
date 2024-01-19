import {
  ExecutionContext,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const setHeadersInRequest = (
  ctx: ExecutionContext,
  headersObject: Record<string, string>,
): void => {
  const ctxGql = GqlExecutionContext.create(ctx);
  const request = ctxGql.getContext().req;

  if (!request.headers) {
    throw new InternalServerErrorException([
      `Couldn't set headers. Headers are not available in the request.`,
      `Request: ${JSON.stringify(request)}`,
    ]);
  }

  Object.entries(headersObject).forEach(([key, value]) => {
    request.headers[key] = value;
  });
};

export const extractTokenFromRequest = (ctx: ExecutionContext): string => {
  const authorizationHeader = extractHeaderFromRequest(
    'authorization',
    ctx,
    () => new UnauthorizedException(),
  );

  if (!authorizationHeader) {
    throw new UnauthorizedException();
  }

  return authorizationHeader.replace('Bearer ', '');
};

export const extractHeaderFromRequest = (
  header: string,
  ctx: ExecutionContext,
  onError?: () => void,
): string => {
  const ctxGql = GqlExecutionContext.create(ctx);
  const request = ctxGql.getContext().req;
  const extractedData = request.headers[header];

  if (!extractedData) {
    if (onError) {
      onError();
    } else {
      throw new InternalServerErrorException([
        `Couldn't extract ${header} from request`,
        `Request: ${JSON.stringify(request)}`,
      ]);
    }
  }

  return extractedData;
};

export const extractAllHeadersFromRequest = (
  ctx: ExecutionContext,
): Record<string, string> => {
  const ctxGql = GqlExecutionContext.create(ctx);
  const request = ctxGql.getContext().req;
  const headers = request.headers;

  if (!headers) {
    throw new InternalServerErrorException([
      `Couldn't extract headers from request`,
      `Request: ${JSON.stringify(request)}`,
    ]);
  }

  return headers;
};
