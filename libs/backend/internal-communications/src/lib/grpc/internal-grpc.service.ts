import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class InternalGrpcService {
  constructor(
    @Inject('AUTH_SERVICE') public readonly authService: any,
    @Inject('USERS_SERVICE') public readonly usersService: any,
  ) {}
}
