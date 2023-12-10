/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "Authentication";

/** User message represents user information. */
export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  hashedPassword: string;
  roles: string[];
  emailVerified: boolean;
}

/** RegistrationRequest message represents a request to register a new user. */
export interface RegistrationRequest {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

/** RegistrationResponse message represents the response to a registration request. */
export interface RegistrationResponse {
  userId: string;
  message: string;
}

/** EmailVerificationRequest represents a request to verify a user's email. */
export interface EmailVerificationRequest {
  userId: string;
  verificationCode: string;
}

/** EmailVerificationResponse represents the response to an email verification request. */
export interface EmailVerificationResponse {
  success: boolean;
  message: string;
}

/** LoginRequest message represents a request to authenticate a user. */
export interface LoginRequest {
  username: string;
  password: string;
}

/** TokenInfo message represents information about a token. */
export interface TokenInfo {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

/** LoginResponse message represents the response to a login request. */
export interface LoginResponse {
  userId: string;
  tokens: TokenInfo | undefined;
  message: string;
}

/** RefreshTokenRequest represents a request to refresh an access token. */
export interface RefreshTokenRequest {
  refreshToken: string;
}

/** RefreshTokenResponse represents the response to a token refresh request. */
export interface RefreshTokenResponse {
  tokens: TokenInfo | undefined;
  message: string;
}

/** MultiFactorAuthRequest represents a request for multi-factor authentication. */
export interface MultiFactorAuthRequest {
  userId: string;
  factorCode: string;
}

/** MultiFactorAuthResponse represents the response to a multi-factor authentication request. */
export interface MultiFactorAuthResponse {
  success: boolean;
  message: string;
}

/** UserProfile message represents user profile information. */
export interface UserProfile {
  userId: string;
  username: string;
  email: string;
  /** Add any additional user profile information fields as needed. */
  roles: string[];
}

/** UpdateUserProfileRequest message represents a request to update user profile information. */
export interface UpdateUserProfileRequest {
  userId: string;
  username: string;
  email: string;
  /** Add any additional fields for updating user profile as needed. */
  roles: string[];
}

/** UpdateUserProfileResponse message represents the response to a user profile update request. */
export interface UpdateUserProfileResponse {
  success: boolean;
  message: string;
}

/** ChangePasswordRequest message represents a request to change the user's password. */
export interface ChangePasswordRequest {
  userId: string;
  oldPassword: string;
  newPassword: string;
}

/** ChangePasswordResponse message represents the response to a password change request. */
export interface ChangePasswordResponse {
  success: boolean;
  message: string;
}

/** ForgotPasswordRequest message represents a request for password reset. */
export interface ForgotPasswordRequest {
  email: string;
}

/** ForgotPasswordResponse message represents the response to a password reset request. */
export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

/** ResetPasswordRequest message represents a request to reset the user's password. */
export interface ResetPasswordRequest {
  userId: string;
  newPassword: string;
  resetCode: string;
}

/** ResetPasswordResponse message represents the response to a password reset request. */
export interface ResetPasswordResponse {
  success: boolean;
  message: string;
}

/** RoleBasedAccessRequest message represents a request for role-based access control. */
export interface RoleBasedAccessRequest {
  userId: string;
  resourceId: string;
  action: string;
}

/** RoleBasedAccessResponse message represents the response to a role-based access control request. */
export interface RoleBasedAccessResponse {
  hasAccess: boolean;
  message: string;
}

/** GetUserProfileRequest message represents a request to get user profile using a token. */
export interface GetUserProfileRequest {
  accessToken: string;
}

export const AUTHENTICATION_PACKAGE_NAME = "Authentication";

/** AuthenticationService defines the authentication service. */

export interface AuthenticationServiceClient {
  /** Register method handles user registration. */

  register(request: RegistrationRequest): Observable<RegistrationResponse>;

  /** VerifyEmail method initiates the email verification process. */

  verifyEmail(request: EmailVerificationRequest): Observable<EmailVerificationResponse>;

  /** Login method handles user authentication and token generation. */

  login(request: LoginRequest): Observable<LoginResponse>;

  /** RefreshToken method refreshes an access token using a refresh token. */

  refreshToken(request: RefreshTokenRequest): Observable<RefreshTokenResponse>;

  /** VerifyMultiFactorAuth method verifies a multi-factor authentication code. */

  verifyMultiFactorAuth(request: MultiFactorAuthRequest): Observable<MultiFactorAuthResponse>;

  /** GetUserProfile method retrieves user profile information. */

  getUserProfile(request: GetUserProfileRequest): Observable<UserProfile>;

  /** UpdateUserProfile method updates user profile information. */

  updateUserProfile(request: UpdateUserProfileRequest): Observable<UpdateUserProfileResponse>;

  /** ChangePassword method changes the user's password. */

  changePassword(request: ChangePasswordRequest): Observable<ChangePasswordResponse>;

  /** ForgotPassword method initiates the password reset process. */

  forgotPassword(request: ForgotPasswordRequest): Observable<ForgotPasswordResponse>;

  /** ResetPassword method resets the user's password. */

  resetPassword(request: ResetPasswordRequest): Observable<ResetPasswordResponse>;

  /** CheckRoleBasedAccess method checks if the user has access to a resource. */

  checkRoleBasedAccess(request: RoleBasedAccessRequest): Observable<RoleBasedAccessResponse>;
}

/** AuthenticationService defines the authentication service. */

export interface AuthenticationServiceController {
  /** Register method handles user registration. */

  register(
    request: RegistrationRequest,
  ): Promise<RegistrationResponse> | Observable<RegistrationResponse> | RegistrationResponse;

  /** VerifyEmail method initiates the email verification process. */

  verifyEmail(
    request: EmailVerificationRequest,
  ): Promise<EmailVerificationResponse> | Observable<EmailVerificationResponse> | EmailVerificationResponse;

  /** Login method handles user authentication and token generation. */

  login(request: LoginRequest): Promise<LoginResponse> | Observable<LoginResponse> | LoginResponse;

  /** RefreshToken method refreshes an access token using a refresh token. */

  refreshToken(
    request: RefreshTokenRequest,
  ): Promise<RefreshTokenResponse> | Observable<RefreshTokenResponse> | RefreshTokenResponse;

  /** VerifyMultiFactorAuth method verifies a multi-factor authentication code. */

  verifyMultiFactorAuth(
    request: MultiFactorAuthRequest,
  ): Promise<MultiFactorAuthResponse> | Observable<MultiFactorAuthResponse> | MultiFactorAuthResponse;

  /** GetUserProfile method retrieves user profile information. */

  getUserProfile(request: GetUserProfileRequest): Promise<UserProfile> | Observable<UserProfile> | UserProfile;

  /** UpdateUserProfile method updates user profile information. */

  updateUserProfile(
    request: UpdateUserProfileRequest,
  ): Promise<UpdateUserProfileResponse> | Observable<UpdateUserProfileResponse> | UpdateUserProfileResponse;

  /** ChangePassword method changes the user's password. */

  changePassword(
    request: ChangePasswordRequest,
  ): Promise<ChangePasswordResponse> | Observable<ChangePasswordResponse> | ChangePasswordResponse;

  /** ForgotPassword method initiates the password reset process. */

  forgotPassword(
    request: ForgotPasswordRequest,
  ): Promise<ForgotPasswordResponse> | Observable<ForgotPasswordResponse> | ForgotPasswordResponse;

  /** ResetPassword method resets the user's password. */

  resetPassword(
    request: ResetPasswordRequest,
  ): Promise<ResetPasswordResponse> | Observable<ResetPasswordResponse> | ResetPasswordResponse;

  /** CheckRoleBasedAccess method checks if the user has access to a resource. */

  checkRoleBasedAccess(
    request: RoleBasedAccessRequest,
  ): Promise<RoleBasedAccessResponse> | Observable<RoleBasedAccessResponse> | RoleBasedAccessResponse;
}

export function AuthenticationServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "register",
      "verifyEmail",
      "login",
      "refreshToken",
      "verifyMultiFactorAuth",
      "getUserProfile",
      "updateUserProfile",
      "changePassword",
      "forgotPassword",
      "resetPassword",
      "checkRoleBasedAccess",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("AuthenticationService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("AuthenticationService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const AUTHENTICATION_SERVICE_NAME = "AuthenticationService";
