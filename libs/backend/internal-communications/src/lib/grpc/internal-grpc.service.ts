import { Inject, Injectable } from '@nestjs/common';
import { AuthServiceController } from '@backend/proto';

@Injectable()
export class InternalGrpcService {
  constructor(
    @Inject('AUTH_SERVICE') public readonly authService: AuthServiceController,
    @Inject('USERS_SERVICE')
    public readonly usersService: any,
  ) {}
}
