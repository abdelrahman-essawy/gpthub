import { createParamDecorator } from '@nestjs/common';
import { extractHeaderFromRequest } from '@backend/utilities';

export const User = createParamDecorator((data: unknown, req) => {
  return extractHeaderFromRequest('user', req);
});
