import { Controller } from '@nestjs/common';
import { UsersService } from '../../../../users/src/app/users/users.service';
import { Query } from '@nestjs/graphql';
import { UserDto } from '@backend/dtos/user';
import { GrpcMethod } from '@nestjs/microservices';
import { IUserTokenPayload } from '@core';

@Controller()
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => UserDto)
  @GrpcMethod('AuthService', 'me')
  async me(userPayload: IUserTokenPayload) {
    return this.usersService.findById(userPayload.id);
  }
}
