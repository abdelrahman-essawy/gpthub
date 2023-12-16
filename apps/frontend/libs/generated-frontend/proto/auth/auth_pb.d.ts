import * as jspb from 'google-protobuf';


export class User extends jspb.Message {
  static toObject(includeInstance: boolean, msg: User): User.AsObject;

  static serializeBinaryToWriter(message: User, writer: jspb.BinaryWriter): void;

  static deserializeBinary(bytes: Uint8Array): User;

  static deserializeBinaryFromReader(message: User, reader: jspb.BinaryReader): User;

  getId(): string;

  setId(value: string): User;

  getUsername(): string;

  setUsername(value: string): User;

  getFirstName(): string;

  setFirstName(value: string): User;

  getLastName(): string;

  setLastName(value: string): User;

  getEmail(): string;

  setEmail(value: string): User;

  getHashedPassword(): string;

  setHashedPassword(value: string): User;

  getRolesList(): Array<string>;

  setRolesList(value: Array<string>): User;

  clearRolesList(): User;

  addRoles(value: string, index?: number): User;

  getEmailVerified(): boolean;

  setEmailVerified(value: boolean): User;

  serializeBinary(): Uint8Array;

  toObject(includeInstance?: boolean): User.AsObject;
}

export namespace User {
  export type AsObject = {
    id: string,
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    hashedPassword: string,
    rolesList: Array<string>,
    emailVerified: boolean,
  }
}

export class RegistrationRequest extends jspb.Message {
  static toObject(includeInstance: boolean, msg: RegistrationRequest): RegistrationRequest.AsObject;

  static serializeBinaryToWriter(message: RegistrationRequest, writer: jspb.BinaryWriter): void;

  static deserializeBinary(bytes: Uint8Array): RegistrationRequest;

  static deserializeBinaryFromReader(message: RegistrationRequest, reader: jspb.BinaryReader): RegistrationRequest;

  getUsername(): string;

  setUsername(value: string): RegistrationRequest;

  getEmail(): string;

  setEmail(value: string): RegistrationRequest;

  getPassword(): string;

  setPassword(value: string): RegistrationRequest;

  getFirstName(): string;

  setFirstName(value: string): RegistrationRequest;

  getLastName(): string;

  setLastName(value: string): RegistrationRequest;

  serializeBinary(): Uint8Array;

  toObject(includeInstance?: boolean): RegistrationRequest.AsObject;
}

export namespace RegistrationRequest {
  export type AsObject = {
    username: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  }
}

export class RegistrationResponse extends jspb.Message {
  static toObject(includeInstance: boolean, msg: RegistrationResponse): RegistrationResponse.AsObject;

  static serializeBinaryToWriter(message: RegistrationResponse, writer: jspb.BinaryWriter): void;

  static deserializeBinary(bytes: Uint8Array): RegistrationResponse;

  static deserializeBinaryFromReader(message: RegistrationResponse, reader: jspb.BinaryReader): RegistrationResponse;

  getUserId(): string;

  setUserId(value: string): RegistrationResponse;

  getMessage(): string;

  setMessage(value: string): RegistrationResponse;

  serializeBinary(): Uint8Array;

  toObject(includeInstance?: boolean): RegistrationResponse.AsObject;
}

export namespace RegistrationResponse {
  export type AsObject = {
    userId: string,
    message: string,
  }
}

export class EmailVerificationRequest extends jspb.Message {
  static toObject(includeInstance: boolean, msg: EmailVerificationRequest): EmailVerificationRequest.AsObject;

  static serializeBinaryToWriter(message: EmailVerificationRequest, writer: jspb.BinaryWriter): void;

  static deserializeBinary(bytes: Uint8Array): EmailVerificationRequest;

  static deserializeBinaryFromReader(message: EmailVerificationRequest, reader: jspb.BinaryReader): EmailVerificationRequest;

  getUserId(): string;

  setUserId(value: string): EmailVerificationRequest;

  getVerificationCode(): string;

  setVerificationCode(value: string): EmailVerificationRequest;

  serializeBinary(): Uint8Array;

  toObject(includeInstance?: boolean): EmailVerificationRequest.AsObject;
}

export namespace EmailVerificationRequest {
  export type AsObject = {
    userId: string,
    verificationCode: string,
  }
}

export class EmailVerificationResponse extends jspb.Message {
  static toObject(includeInstance: boolean, msg: EmailVerificationResponse): EmailVerificationResponse.AsObject;

  static serializeBinaryToWriter(message: EmailVerificationResponse, writer: jspb.BinaryWriter): void;

  static deserializeBinary(bytes: Uint8Array): EmailVerificationResponse;

  static deserializeBinaryFromReader(message: EmailVerificationResponse, reader: jspb.BinaryReader): EmailVerificationResponse;

  getSuccess(): boolean;

  setSuccess(value: boolean): EmailVerificationResponse;

  getMessage(): string;

  setMessage(value: string): EmailVerificationResponse;

  serializeBinary(): Uint8Array;

  toObject(includeInstance?: boolean): EmailVerificationResponse.AsObject;
}

export namespace EmailVerificationResponse {
  export type AsObject = {
    success: boolean,
    message: string,
  }
}

export class LoginRequest extends jspb.Message {
  static toObject(includeInstance: boolean, msg: LoginRequest): LoginRequest.AsObject;

  static serializeBinaryToWriter(message: LoginRequest, writer: jspb.BinaryWriter): void;

  static deserializeBinary(bytes: Uint8Array): LoginRequest;

  static deserializeBinaryFromReader(message: LoginRequest, reader: jspb.BinaryReader): LoginRequest;

  getUsernameOrEmail(): string;

  setUsernameOrEmail(value: string): LoginRequest;

  getPassword(): string;

  setPassword(value: string): LoginRequest;

  serializeBinary(): Uint8Array;

  toObject(includeInstance?: boolean): LoginRequest.AsObject;
}

export namespace LoginRequest {
  export type AsObject = {
    usernameOrEmail: string,
    password: string,
  }
}

export class TokenInfo extends jspb.Message {
  static toObject(includeInstance: boolean, msg: TokenInfo): TokenInfo.AsObject;

  static serializeBinaryToWriter(message: TokenInfo, writer: jspb.BinaryWriter): void;

  static deserializeBinary(bytes: Uint8Array): TokenInfo;

  static deserializeBinaryFromReader(message: TokenInfo, reader: jspb.BinaryReader): TokenInfo;

  getAccessToken(): string;

  setAccessToken(value: string): TokenInfo;

  getRefreshToken(): string;

  setRefreshToken(value: string): TokenInfo;

  getExpiresAt(): number;

  setExpiresAt(value: number): TokenInfo;

  serializeBinary(): Uint8Array;

  toObject(includeInstance?: boolean): TokenInfo.AsObject;
}

export namespace TokenInfo {
  export type AsObject = {
    accessToken: string,
    refreshToken: string,
    expiresAt: number,
  }
}

export class LoginResponse extends jspb.Message {
  static toObject(includeInstance: boolean, msg: LoginResponse): LoginResponse.AsObject;

  static serializeBinaryToWriter(message: LoginResponse, writer: jspb.BinaryWriter): void;

  static deserializeBinary(bytes: Uint8Array): LoginResponse;

  static deserializeBinaryFromReader(message: LoginResponse, reader: jspb.BinaryReader): LoginResponse;

  getUserId(): string;

  setUserId(value: string): LoginResponse;

  getTokens(): TokenInfo | undefined;

  setTokens(value?: TokenInfo): LoginResponse;

  hasTokens(): boolean;

  clearTokens(): LoginResponse;

  getMessage(): string;

  setMessage(value: string): LoginResponse;

  serializeBinary(): Uint8Array;

  toObject(includeInstance?: boolean): LoginResponse.AsObject;
}

export namespace LoginResponse {
  export type AsObject = {
    userId: string,
    tokens?: TokenInfo.AsObject,
    message: string,
  }
}

export class RefreshTokenRequest extends jspb.Message {
  static toObject(includeInstance: boolean, msg: RefreshTokenRequest): RefreshTokenRequest.AsObject;

  static serializeBinaryToWriter(message: RefreshTokenRequest, writer: jspb.BinaryWriter): void;

  static deserializeBinary(bytes: Uint8Array): RefreshTokenRequest;

  static deserializeBinaryFromReader(message: RefreshTokenRequest, reader: jspb.BinaryReader): RefreshTokenRequest;

  getRefreshToken(): string;

  setRefreshToken(value: string): RefreshTokenRequest;

  serializeBinary(): Uint8Array;

  toObject(includeInstance?: boolean): RefreshTokenRequest.AsObject;
}

export namespace RefreshTokenRequest {
  export type AsObject = {
    refreshToken: string,
  }
}

export class RefreshTokenResponse extends jspb.Message {
  static toObject(includeInstance: boolean, msg: RefreshTokenResponse): RefreshTokenResponse.AsObject;

  static serializeBinaryToWriter(message: RefreshTokenResponse, writer: jspb.BinaryWriter): void;

  static deserializeBinary(bytes: Uint8Array): RefreshTokenResponse;

  static deserializeBinaryFromReader(message: RefreshTokenResponse, reader: jspb.BinaryReader): RefreshTokenResponse;

  getTokens(): TokenInfo | undefined;

  setTokens(value?: TokenInfo): RefreshTokenResponse;

  hasTokens(): boolean;

  clearTokens(): RefreshTokenResponse;

  getMessage(): string;

  setMessage(value: string): RefreshTokenResponse;

  serializeBinary(): Uint8Array;

  toObject(includeInstance?: boolean): RefreshTokenResponse.AsObject;
}

export namespace RefreshTokenResponse {
  export type AsObject = {
    tokens?: TokenInfo.AsObject,
    message: string,
  }
}

export class MultiFactorAuthRequest extends jspb.Message {
  static toObject(includeInstance: boolean, msg: MultiFactorAuthRequest): MultiFactorAuthRequest.AsObject;

  static serializeBinaryToWriter(message: MultiFactorAuthRequest, writer: jspb.BinaryWriter): void;

  static deserializeBinary(bytes: Uint8Array): MultiFactorAuthRequest;

  static deserializeBinaryFromReader(message: MultiFactorAuthRequest, reader: jspb.BinaryReader): MultiFactorAuthRequest;

  getUserId(): string;

  setUserId(value: string): MultiFactorAuthRequest;

  getFactorCode(): string;

  setFactorCode(value: string): MultiFactorAuthRequest;

  serializeBinary(): Uint8Array;

  toObject(includeInstance?: boolean): MultiFactorAuthRequest.AsObject;
}

export namespace MultiFactorAuthRequest {
  export type AsObject = {
    userId: string,
    factorCode: string,
  }
}

export class MultiFactorAuthResponse extends jspb.Message {
  static toObject(includeInstance: boolean, msg: MultiFactorAuthResponse): MultiFactorAuthResponse.AsObject;

  static serializeBinaryToWriter(message: MultiFactorAuthResponse, writer: jspb.BinaryWriter): void;

  static deserializeBinary(bytes: Uint8Array): MultiFactorAuthResponse;

  static deserializeBinaryFromReader(message: MultiFactorAuthResponse, reader: jspb.BinaryReader): MultiFactorAuthResponse;

  getSuccess(): boolean;

  setSuccess(value: boolean): MultiFactorAuthResponse;

  getMessage(): string;

  setMessage(value: string): MultiFactorAuthResponse;

  serializeBinary(): Uint8Array;

  toObject(includeInstance?: boolean): MultiFactorAuthResponse.AsObject;
}

export namespace MultiFactorAuthResponse {
  export type AsObject = {
    success: boolean,
    message: string,
  }
}

export class UserProfile extends jspb.Message {
  static toObject(includeInstance: boolean, msg: UserProfile): UserProfile.AsObject;

  static serializeBinaryToWriter(message: UserProfile, writer: jspb.BinaryWriter): void;

  static deserializeBinary(bytes: Uint8Array): UserProfile;

  static deserializeBinaryFromReader(message: UserProfile, reader: jspb.BinaryReader): UserProfile;

  getUserId(): string;

  setUserId(value: string): UserProfile;

  getUsername(): string;

  setUsername(value: string): UserProfile;

  getEmail(): string;

  setEmail(value: string): UserProfile;

  getRolesList(): Array<string>;

  setRolesList(value: Array<string>): UserProfile;

  clearRolesList(): UserProfile;

  addRoles(value: string, index?: number): UserProfile;

  serializeBinary(): Uint8Array;

  toObject(includeInstance?: boolean): UserProfile.AsObject;
}

export namespace UserProfile {
  export type AsObject = {
    userId: string,
    username: string,
    email: string,
    rolesList: Array<string>,
  }
}

export class UpdateUserProfileRequest extends jspb.Message {
  static toObject(includeInstance: boolean, msg: UpdateUserProfileRequest): UpdateUserProfileRequest.AsObject;

  static serializeBinaryToWriter(message: UpdateUserProfileRequest, writer: jspb.BinaryWriter): void;

  static deserializeBinary(bytes: Uint8Array): UpdateUserProfileRequest;

  static deserializeBinaryFromReader(message: UpdateUserProfileRequest, reader: jspb.BinaryReader): UpdateUserProfileRequest;

  getUserId(): string;

  setUserId(value: string): UpdateUserProfileRequest;

  getUsername(): string;

  setUsername(value: string): UpdateUserProfileRequest;

  getEmail(): string;

  setEmail(value: string): UpdateUserProfileRequest;

  getRolesList(): Array<string>;

  setRolesList(value: Array<string>): UpdateUserProfileRequest;

  clearRolesList(): UpdateUserProfileRequest;

  addRoles(value: string, index?: number): UpdateUserProfileRequest;

  serializeBinary(): Uint8Array;

  toObject(includeInstance?: boolean): UpdateUserProfileRequest.AsObject;
}

export namespace UpdateUserProfileRequest {
  export type AsObject = {
    userId: string,
    username: string,
    email: string,
    rolesList: Array<string>,
  }
}

export class UpdateUserProfileResponse extends jspb.Message {
  static toObject(includeInstance: boolean, msg: UpdateUserProfileResponse): UpdateUserProfileResponse.AsObject;

  static serializeBinaryToWriter(message: UpdateUserProfileResponse, writer: jspb.BinaryWriter): void;

  static deserializeBinary(bytes: Uint8Array): UpdateUserProfileResponse;

  static deserializeBinaryFromReader(message: UpdateUserProfileResponse, reader: jspb.BinaryReader): UpdateUserProfileResponse;

  getSuccess(): boolean;

  setSuccess(value: boolean): UpdateUserProfileResponse;

  getMessage(): string;

  setMessage(value: string): UpdateUserProfileResponse;

  serializeBinary(): Uint8Array;

  toObject(includeInstance?: boolean): UpdateUserProfileResponse.AsObject;
}

export namespace UpdateUserProfileResponse {
  export type AsObject = {
    success: boolean,
    message: string,
  }
}

export class ChangePasswordRequest extends jspb.Message {
  static toObject(includeInstance: boolean, msg: ChangePasswordRequest): ChangePasswordRequest.AsObject;

  static serializeBinaryToWriter(message: ChangePasswordRequest, writer: jspb.BinaryWriter): void;

  static deserializeBinary(bytes: Uint8Array): ChangePasswordRequest;

  static deserializeBinaryFromReader(message: ChangePasswordRequest, reader: jspb.BinaryReader): ChangePasswordRequest;

  getUserId(): string;

  setUserId(value: string): ChangePasswordRequest;

  getOldPassword(): string;

  setOldPassword(value: string): ChangePasswordRequest;

  getNewPassword(): string;

  setNewPassword(value: string): ChangePasswordRequest;

  serializeBinary(): Uint8Array;

  toObject(includeInstance?: boolean): ChangePasswordRequest.AsObject;
}

export namespace ChangePasswordRequest {
  export type AsObject = {
    userId: string,
    oldPassword: string,
    newPassword: string,
  }
}

export class ChangePasswordResponse extends jspb.Message {
  static toObject(includeInstance: boolean, msg: ChangePasswordResponse): ChangePasswordResponse.AsObject;

  static serializeBinaryToWriter(message: ChangePasswordResponse, writer: jspb.BinaryWriter): void;

  static deserializeBinary(bytes: Uint8Array): ChangePasswordResponse;

  static deserializeBinaryFromReader(message: ChangePasswordResponse, reader: jspb.BinaryReader): ChangePasswordResponse;

  getSuccess(): boolean;

  setSuccess(value: boolean): ChangePasswordResponse;

  getMessage(): string;

  setMessage(value: string): ChangePasswordResponse;

  serializeBinary(): Uint8Array;

  toObject(includeInstance?: boolean): ChangePasswordResponse.AsObject;
}

export namespace ChangePasswordResponse {
  export type AsObject = {
    success: boolean,
    message: string,
  }
}

export class ForgotPasswordRequest extends jspb.Message {
  static toObject(includeInstance: boolean, msg: ForgotPasswordRequest): ForgotPasswordRequest.AsObject;

  static serializeBinaryToWriter(message: ForgotPasswordRequest, writer: jspb.BinaryWriter): void;

  static deserializeBinary(bytes: Uint8Array): ForgotPasswordRequest;

  static deserializeBinaryFromReader(message: ForgotPasswordRequest, reader: jspb.BinaryReader): ForgotPasswordRequest;

  getEmail(): string;

  setEmail(value: string): ForgotPasswordRequest;

  serializeBinary(): Uint8Array;

  toObject(includeInstance?: boolean): ForgotPasswordRequest.AsObject;
}

export namespace ForgotPasswordRequest {
  export type AsObject = {
    email: string,
  }
}

export class ForgotPasswordResponse extends jspb.Message {
  static toObject(includeInstance: boolean, msg: ForgotPasswordResponse): ForgotPasswordResponse.AsObject;

  static serializeBinaryToWriter(message: ForgotPasswordResponse, writer: jspb.BinaryWriter): void;

  static deserializeBinary(bytes: Uint8Array): ForgotPasswordResponse;

  static deserializeBinaryFromReader(message: ForgotPasswordResponse, reader: jspb.BinaryReader): ForgotPasswordResponse;

  getSuccess(): boolean;

  setSuccess(value: boolean): ForgotPasswordResponse;

  getMessage(): string;

  setMessage(value: string): ForgotPasswordResponse;

  serializeBinary(): Uint8Array;

  toObject(includeInstance?: boolean): ForgotPasswordResponse.AsObject;
}

export namespace ForgotPasswordResponse {
  export type AsObject = {
    success: boolean,
    message: string,
  }
}

export class ResetPasswordRequest extends jspb.Message {
  static toObject(includeInstance: boolean, msg: ResetPasswordRequest): ResetPasswordRequest.AsObject;

  static serializeBinaryToWriter(message: ResetPasswordRequest, writer: jspb.BinaryWriter): void;

  static deserializeBinary(bytes: Uint8Array): ResetPasswordRequest;

  static deserializeBinaryFromReader(message: ResetPasswordRequest, reader: jspb.BinaryReader): ResetPasswordRequest;

  getUserId(): string;

  setUserId(value: string): ResetPasswordRequest;

  getNewPassword(): string;

  setNewPassword(value: string): ResetPasswordRequest;

  getResetCode(): string;

  setResetCode(value: string): ResetPasswordRequest;

  serializeBinary(): Uint8Array;

  toObject(includeInstance?: boolean): ResetPasswordRequest.AsObject;
}

export namespace ResetPasswordRequest {
  export type AsObject = {
    userId: string,
    newPassword: string,
    resetCode: string,
  }
}

export class ResetPasswordResponse extends jspb.Message {
  static toObject(includeInstance: boolean, msg: ResetPasswordResponse): ResetPasswordResponse.AsObject;

  static serializeBinaryToWriter(message: ResetPasswordResponse, writer: jspb.BinaryWriter): void;

  static deserializeBinary(bytes: Uint8Array): ResetPasswordResponse;

  static deserializeBinaryFromReader(message: ResetPasswordResponse, reader: jspb.BinaryReader): ResetPasswordResponse;

  getSuccess(): boolean;

  setSuccess(value: boolean): ResetPasswordResponse;

  getMessage(): string;

  setMessage(value: string): ResetPasswordResponse;

  serializeBinary(): Uint8Array;

  toObject(includeInstance?: boolean): ResetPasswordResponse.AsObject;
}

export namespace ResetPasswordResponse {
  export type AsObject = {
    success: boolean,
    message: string,
  }
}

export class RoleBasedAccessRequest extends jspb.Message {
  static toObject(includeInstance: boolean, msg: RoleBasedAccessRequest): RoleBasedAccessRequest.AsObject;

  static serializeBinaryToWriter(message: RoleBasedAccessRequest, writer: jspb.BinaryWriter): void;

  static deserializeBinary(bytes: Uint8Array): RoleBasedAccessRequest;

  static deserializeBinaryFromReader(message: RoleBasedAccessRequest, reader: jspb.BinaryReader): RoleBasedAccessRequest;

  getUserId(): string;

  setUserId(value: string): RoleBasedAccessRequest;

  getResourceId(): string;

  setResourceId(value: string): RoleBasedAccessRequest;

  getAction(): string;

  setAction(value: string): RoleBasedAccessRequest;

  serializeBinary(): Uint8Array;

  toObject(includeInstance?: boolean): RoleBasedAccessRequest.AsObject;
}

export namespace RoleBasedAccessRequest {
  export type AsObject = {
    userId: string,
    resourceId: string,
    action: string,
  }
}

export class RoleBasedAccessResponse extends jspb.Message {
  static toObject(includeInstance: boolean, msg: RoleBasedAccessResponse): RoleBasedAccessResponse.AsObject;

  static serializeBinaryToWriter(message: RoleBasedAccessResponse, writer: jspb.BinaryWriter): void;

  static deserializeBinary(bytes: Uint8Array): RoleBasedAccessResponse;

  static deserializeBinaryFromReader(message: RoleBasedAccessResponse, reader: jspb.BinaryReader): RoleBasedAccessResponse;

  getHasAccess(): boolean;

  setHasAccess(value: boolean): RoleBasedAccessResponse;

  getMessage(): string;

  setMessage(value: string): RoleBasedAccessResponse;

  serializeBinary(): Uint8Array;

  toObject(includeInstance?: boolean): RoleBasedAccessResponse.AsObject;
}

export namespace RoleBasedAccessResponse {
  export type AsObject = {
    hasAccess: boolean,
    message: string,
  }
}

export class GetUserProfileRequest extends jspb.Message {
  static toObject(includeInstance: boolean, msg: GetUserProfileRequest): GetUserProfileRequest.AsObject;

  static serializeBinaryToWriter(message: GetUserProfileRequest, writer: jspb.BinaryWriter): void;

  static deserializeBinary(bytes: Uint8Array): GetUserProfileRequest;

  static deserializeBinaryFromReader(message: GetUserProfileRequest, reader: jspb.BinaryReader): GetUserProfileRequest;

  getAccessToken(): string;

  setAccessToken(value: string): GetUserProfileRequest;

  serializeBinary(): Uint8Array;

  toObject(includeInstance?: boolean): GetUserProfileRequest.AsObject;
}

export namespace GetUserProfileRequest {
  export type AsObject = {
    accessToken: string,
  }
}

