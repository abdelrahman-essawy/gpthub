/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export const protobufPackage = 'auth';

export enum UserRole {
  USER = 0,
  ADMIN = 1,
  UNRECOGNIZED = -1,
}

export interface Payload {
  id: string;
  exp: number;
  iat: number;
}

export interface UserEntity {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  verified: boolean;
  role: string;
  hashedRefreshToken: string;
}

export const AUTH_PACKAGE_NAME = 'auth';

export interface AuthServiceClient {
  me(request: Payload): Observable<UserEntity>;
}

export interface AuthServiceController {
  me(
    request: Payload,
  ): Promise<UserEntity> | Observable<UserEntity> | UserEntity;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['me'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('AuthService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('AuthService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const AUTH_SERVICE_NAME = 'AuthService';
