import { Controller } from '@nestjs/common';
import { Query } from '@nestjs/graphql';
import { UserDto } from '@backend/dtos/user';
import { IUserTokenPayload } from '@core';
import { AuthService } from './auth.service';
import { AuthServiceMethods } from '../../proto/auth_nestjs';

@Controller()
@AuthServiceMethods()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Query(() => UserDto)
  async me(userPayload: IUserTokenPayload) {
    return this.authService.me(userPayload);
  }
}
