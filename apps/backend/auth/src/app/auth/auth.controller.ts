import { Controller } from '@nestjs/common';
import { Query } from '@nestjs/graphql';
import { UserDto } from '@backend/dtos/user';
import { GrpcMethod } from '@nestjs/microservices';
import { IUserTokenPayload } from '@core';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Query(() => UserDto)
  @GrpcMethod('AuthService', 'me')
  async me(userPayload: IUserTokenPayload) {
    return this.authService.me(userPayload);
  }
}
