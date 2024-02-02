import { Inject, Injectable } from '@nestjs/common';
import { AuthServiceClient } from '@backend/proto';

@Injectable()
export class InternalGrpcService {
  constructor(
    @Inject('AUTH_SERVICE') public readonly authService: AuthServiceClient,
    // @Inject('USERS_SERVICE')
    // public readonly usersService: any,
  ) {}
}
