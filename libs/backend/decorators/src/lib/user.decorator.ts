import { createParamDecorator } from '@nestjs/common';
import {
  extractAllHeadersFromRequest,
  extractHeaderFromRequest,
} from '@backend/utilities';

export const User = createParamDecorator((data: unknown, req) => {
  console.log(extractAllHeadersFromRequest(req));
  return extractHeaderFromRequest('user', req);
});
