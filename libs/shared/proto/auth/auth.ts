/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "authentication";

/** Define the CreateUserRequest message */
export interface CreateUserRequest {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
}

/** Define the UpdateUserRequest message */
export interface UpdateUserRequest {
  firstName: string;
  lastName: string;
  avatar: string;
}

/** Define the AuthenticateUserRequest message */
export interface AuthenticateUserRequest {
  usernameOrEmail: string;
  password: string;
}

/** Define the UpdatePasswordRequest message */
export interface UpdatePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

/** Define the CreateUserResponse message */
export interface CreateUserResponse {
}

/** Define the UpdateUserResponse message */
export interface UpdateUserResponse {
}

/** Define the UpdatePasswordResponse message */
export interface UpdatePasswordResponse {
}

export const AUTHENTICATION_PACKAGE_NAME = "authentication";

/** Define the AuthenticationService service */

export interface AuthenticationServiceClient {
  /** gRPC method for user registration */

  createUser(request: CreateUserRequest): Observable<CreateUserResponse>;

  /** gRPC method for updating user information */

  updateUser(request: UpdateUserRequest): Observable<UpdateUserResponse>;

  /** gRPC method for updating user password */

  updatePassword(request: UpdatePasswordRequest): Observable<UpdatePasswordResponse>;
}

/** Define the AuthenticationService service */

export interface AuthenticationServiceController {
  /** gRPC method for user registration */

  createUser(
    request: CreateUserRequest,
  ): Promise<CreateUserResponse> | Observable<CreateUserResponse> | CreateUserResponse;

  /** gRPC method for updating user information */

  updateUser(
    request: UpdateUserRequest,
  ): Promise<UpdateUserResponse> | Observable<UpdateUserResponse> | UpdateUserResponse;

  /** gRPC method for updating user password */

  updatePassword(
    request: UpdatePasswordRequest,
  ): Promise<UpdatePasswordResponse> | Observable<UpdatePasswordResponse> | UpdatePasswordResponse;
}

export function AuthenticationServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createUser", "updateUser", "updatePassword"];
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
