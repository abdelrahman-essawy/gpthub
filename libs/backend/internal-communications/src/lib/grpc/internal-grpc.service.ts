import { Inject, Injectable } from '@nestjs/common';
import { AuthServiceController } from '../../../../../../apps/backend/auth/src/proto/auth_nestjs';

@Injectable()
export class InternalGrpcService {
  constructor(
    @Inject('AUTH_SERVICE') public readonly authService: AuthServiceController,
    @Inject('USERS_SERVICE') public readonly usersService: any,
  ) {}
}
