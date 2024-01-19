import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { extractTokenFromRequest } from '@backend/utilities';

export const CatchToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => extractTokenFromRequest(ctx),
);
