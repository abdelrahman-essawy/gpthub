import { Body, Controller, Post } from '@nestjs/common';

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
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../../../../libs/dtos/src/user.dto';

@ApiTags('Authentication')
@AuthenticationServiceControllerMethods()
@Controller()
export class AuthController implements AuthenticationServiceController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200 })
  login(
    @Body() request: LoginRequest
  ): Promise<LoginResponse> | Observable<LoginResponse> | LoginResponse {
    return undefined;
  }

  @Post('refresh-token')
  @ApiOperation({ summary: 'Refresh Token' })
  refreshToken(
    @Body() request: RefreshTokenRequest
  ):
    | Promise<RefreshTokenResponse>
    | Observable<RefreshTokenResponse>
    | RefreshTokenResponse {
    return undefined;
  }

  @Post('register')
  @ApiOperation({ summary: 'Register User' })
  @ApiResponse({ status: 201 })
  @ApiBody({ type: CreateUserDto })
  register(
    @Body() request: RegistrationRequest
  ):
    | Promise<RegistrationResponse>
    | Observable<RegistrationResponse>
    | RegistrationResponse {
    return this.authService.register(request);
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
