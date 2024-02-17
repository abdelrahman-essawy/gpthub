import { Module } from '@nestjs/common';
import { ClientGrpc, ClientsModule, Transport } from '@nestjs/microservices';

import { AUTH_PACKAGE_NAME, AUTH_SERVICE_NAME } from '@backend/proto';

import { InternalGrpcService } from './internal-grpc.service';
import { AUTH_SERVICE_PROTO_PATH } from './constants';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: AUTH_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: AUTH_PACKAGE_NAME,
          protoPath: AUTH_SERVICE_PROTO_PATH,
        },
      },
    ]),
  ],
  providers: [
    InternalGrpcService,
    {
      provide: AUTH_SERVICE_NAME,
      useFactory: async (client: ClientGrpc) =>
        await client.getService(AUTH_SERVICE_NAME),
      inject: [AUTH_PACKAGE_NAME],
    },
  ],
  exports: [AUTH_SERVICE_NAME],
})
export class InternalGrpcModule {}
