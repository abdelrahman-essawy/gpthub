import { Controller } from '@nestjs/common';

import { AuthService } from './auth.service';
import {
  AuthenticationServiceController,
  AuthenticationServiceControllerMethods,
  ChangePasswordRequest,
  ChangePasswordResponse,
  EmailVerificationRequest,
  EmailVerificationResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  GetUserProfileRequest,
  LoginRequest,
  LoginResponse,
  MultiFactorAuthRequest,
  MultiFactorAuthResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  RegistrationRequest,
  RegistrationResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  RoleBasedAccessRequest,
  RoleBasedAccessResponse,
  UpdateUserProfileRequest,
  UpdateUserProfileResponse,
  UserProfile,
} from '@global/proto';
import { Observable } from 'rxjs';

@AuthenticationServiceControllerMethods()
@Controller()
export class AuthController implements AuthenticationServiceController {
  constructor(private readonly appService: AuthService) {}

  login(
    request: LoginRequest
  ): Promise<LoginResponse> | Observable<LoginResponse> | LoginResponse {
    return undefined;
  }

  refreshToken(
    request: RefreshTokenRequest
  ):
    | Promise<RefreshTokenResponse>
    | Observable<RefreshTokenResponse>
    | RefreshTokenResponse {
    return undefined;
  }

  register(
    request: RegistrationRequest
  ):
    | Promise<RegistrationResponse>
    | Observable<RegistrationResponse>
    | RegistrationResponse {
    return undefined;
  }

  verifyEmail(
    request: EmailVerificationRequest
  ):
    | Promise<EmailVerificationResponse>
    | Observable<EmailVerificationResponse>
    | EmailVerificationResponse {
    return undefined;
  }

  verifyMultiFactorAuth(
    request: MultiFactorAuthRequest
  ):
    | Promise<MultiFactorAuthResponse>
    | Observable<MultiFactorAuthResponse>
    | MultiFactorAuthResponse {
    return undefined;
  }

  changePassword(
    request: ChangePasswordRequest
  ):
    | Promise<ChangePasswordResponse>
    | Observable<ChangePasswordResponse>
    | ChangePasswordResponse {
    return undefined;
  }

  checkRoleBasedAccess(
    request: RoleBasedAccessRequest
  ):
    | Promise<RoleBasedAccessResponse>
    | Observable<RoleBasedAccessResponse>
    | RoleBasedAccessResponse {
    return undefined;
  }

  forgotPassword(
    request: ForgotPasswordRequest
  ):
    | Promise<ForgotPasswordResponse>
    | Observable<ForgotPasswordResponse>
    | ForgotPasswordResponse {
    return undefined;
  }

  getUserProfile(
    request: GetUserProfileRequest
  ): Promise<UserProfile> | Observable<UserProfile> | UserProfile {
    return undefined;
  }

  resetPassword(
    request: ResetPasswordRequest
  ):
    | Promise<ResetPasswordResponse>
    | Observable<ResetPasswordResponse>
    | ResetPasswordResponse {
    return undefined;
  }

  updateUserProfile(
    request: UpdateUserProfileRequest
  ):
    | Promise<UpdateUserProfileResponse>
    | Observable<UpdateUserProfileResponse>
    | UpdateUserProfileResponse {
    return undefined;
  }
}
