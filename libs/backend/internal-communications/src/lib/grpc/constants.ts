import { join } from 'path';
import { Env, NODE_ENV } from '@backend/utilities';

export const AUTH_SERVICE_PROTO_PATH =
  NODE_ENV === Env.E2E
    ? 'apps/backend/users/src/proto/auth.proto'
    : join(__dirname, 'proto/auth.proto');
