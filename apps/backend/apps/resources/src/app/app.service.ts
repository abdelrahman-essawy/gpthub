import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  AUTHENTICATION_SERVICE_NAME,
  AuthenticationServiceClient,
} from '@global/proto';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @Inject(AUTHENTICATION_SERVICE_NAME) private readonly client: ClientGrpc
  ) {}

  authClient: AuthenticationServiceClient;

  onModuleInit() {
    this.authClient = this.client.getService(AUTHENTICATION_SERVICE_NAME);
  }
}
