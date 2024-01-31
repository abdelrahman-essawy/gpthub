import { Controller } from '@nestjs/common';
import { IUserTokenPayload } from '@core';
import { AuthService } from './auth.service';
import { AuthServiceControllerMethods } from '@backend/proto';

@Controller()
@AuthServiceControllerMethods()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async me(userPayload: IUserTokenPayload) {
    return this.authService.me(userPayload);
  }
}
