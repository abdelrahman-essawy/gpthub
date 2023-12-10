import { Controller } from '@nestjs/common';

import { AppService } from './app.service';
import { Observable } from 'rxjs';
import {
  AuthController,
  AuthControllerMethods,
  LoginOrRegisterResponse,
  LoginRequest,
  RegisterRequest,
} from '@global/proto';
import * as console from 'console';

@AuthControllerMethods()
@Controller()
export class AppController implements AuthController {
  constructor(private readonly appService: AppService) {}

  login(
    request: LoginRequest
  ):
    | Promise<LoginOrRegisterResponse>
    | Observable<LoginOrRegisterResponse>
    | LoginOrRegisterResponse {
    console.log(request);
    const token = this.appService.login();
    return {
      token,
    };
  }

  register(
    request: RegisterRequest
  ):
    | Promise<LoginOrRegisterResponse>
    | Observable<LoginOrRegisterResponse>
    | LoginOrRegisterResponse {
    return undefined;
  }
}
