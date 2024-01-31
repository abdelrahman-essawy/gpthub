import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { IUserTokenPayload } from '@core';
import { UsersServiceControllerMethods } from '@backend/proto';

@Controller()
@UsersServiceControllerMethods()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  async findOne(userPayload: IUserTokenPayload) {
    return await this.usersService.findById(userPayload.id);
  }
}
