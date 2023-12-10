/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "Auth";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginOrRegisterResponse {
  token: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export const AUTH_PACKAGE_NAME = "Auth";

export interface AuthClient {
  login(request: LoginRequest): Observable<LoginOrRegisterResponse>;

  register(request: RegisterRequest): Observable<LoginOrRegisterResponse>;
}

export interface AuthController {
  login(
    request: LoginRequest,
  ): Promise<LoginOrRegisterResponse> | Observable<LoginOrRegisterResponse> | LoginOrRegisterResponse;

  register(
    request: RegisterRequest,
  ): Promise<LoginOrRegisterResponse> | Observable<LoginOrRegisterResponse> | LoginOrRegisterResponse;
}

export function AuthControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["login", "register"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("Auth", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("Auth", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const AUTH_SERVICE_NAME = "Auth";
