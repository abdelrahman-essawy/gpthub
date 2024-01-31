/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "users";

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

export interface userId {
  id: string;
}

export const USERS_PACKAGE_NAME = "users";

export interface UsersServiceClient {
  findOne(request: userId): Observable<UserEntity>;
}

export interface UsersServiceController {
  findOne(request: userId): Promise<UserEntity> | Observable<UserEntity> | UserEntity;
}

export function UsersServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["findOne"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UsersService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UsersService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USERS_SERVICE_NAME = "UsersService";
