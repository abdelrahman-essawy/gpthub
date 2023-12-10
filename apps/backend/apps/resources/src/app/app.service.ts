import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { AUTH_SERVICE_NAME, AuthClient } from '@global/proto';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(@Inject(AUTH_SERVICE_NAME) private readonly client: ClientGrpc) {}

  authClient: AuthClient;

  onModuleInit() {
    this.authClient = this.client.getService(AUTH_SERVICE_NAME);
  }

  test() {
    return this.authClient.login({
      email: 'test',
      password: 'test',
    });
  }
}
