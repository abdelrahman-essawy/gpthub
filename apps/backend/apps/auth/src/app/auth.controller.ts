import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { Observable } from 'rxjs';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

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
  UserProfile
} from '@backend/generated';

import { AuthenticateUserDto, CreateUserDto } from '@backend/dtos';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Authentication')
@AuthenticationServiceControllerMethods()
@Controller()
export class AuthController implements AuthenticationServiceController {
  constructor(private readonly authService: AuthService) {
  }

  @Get('health')
  @ApiOperation({ summary: 'Health Check' })
  @ApiResponse({ status: 200 })
  healthCheck(): string {
    return 'Authentication Service is up and running!';
  }


  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiBody({ type: AuthenticateUserDto })
  @UseGuards(AuthGuard('local'))
  @ApiResponse({ status: 200 })
  login(
    @Body() user: LoginRequest
  ): Promise<LoginResponse> | Observable<LoginResponse> | LoginResponse {
    return this.authService.authenticate(user);
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
