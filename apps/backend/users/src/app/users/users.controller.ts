import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { GrpcMethod } from '@nestjs/microservices';
import { IUserTokenPayload } from '@core';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @GrpcMethod('UsersService', 'findOne')
  async findOne(userPayload: IUserTokenPayload) {
    return await this.usersService.findById(userPayload.id);
  }
}
