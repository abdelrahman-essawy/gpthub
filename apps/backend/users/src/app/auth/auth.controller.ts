import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  AuthServiceController,
  AuthServiceControllerMethods,
  PassableUserTokenPayload,
} from '@backend/proto';

@Controller()
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
  constructor(private readonly authService: AuthService) {}

  async me(request: PassableUserTokenPayload) {
    return await this.authService.me(request);
  }
}
