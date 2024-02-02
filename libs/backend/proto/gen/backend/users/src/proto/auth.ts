/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { wrappers } from "protobufjs";
import { Observable } from "rxjs";

export const protobufPackage = "auth";

export interface PassableUserTokenPayload {
  id: string;
  exp: number;
  iat: number;
}

export interface PassableUserEntity {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  verified: boolean;
  role: string;
  hashedRefreshToken: string;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
}

export const AUTH_PACKAGE_NAME = "auth";

wrappers[".google.protobuf.Timestamp"] = {
  fromObject(value: Date) {
    return { seconds: value.getTime() / 1000, nanos: (value.getTime() % 1000) * 1e6 };
  },
  toObject(message: { seconds: number; nanos: number }) {
    return new Date(message.seconds * 1000 + message.nanos / 1e6);
  },
} as any;

export interface AuthServiceClient {
  me(request: PassableUserTokenPayload): Observable<PassableUserEntity>;
}

export interface AuthServiceController {
  me(
    request: PassableUserTokenPayload,
  ): Promise<PassableUserEntity> | Observable<PassableUserEntity> | PassableUserEntity;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["me"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const AUTH_SERVICE_NAME = "AuthService";
