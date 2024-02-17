import { Inject, Injectable } from '@nestjs/common';
import { AUTH_SERVICE_NAME, AuthServiceClient } from '@backend/proto';

@Injectable()
export class InternalGrpcService {
  constructor(
    @Inject(AUTH_SERVICE_NAME) public readonly authService: AuthServiceClient,
    // @Inject('USERS_SERVICE')
    // public readonly usersService: any,
  ) {}
}
