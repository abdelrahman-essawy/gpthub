import { Module } from '@nestjs/common';
import { ClientGrpc, ClientsModule, Transport } from '@nestjs/microservices';
import { InternalGrpcService } from './internal-grpc.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'auth',
          protoPath: 'apps/backend/users/src/proto/auth.proto',
        },
      },
    ]),
  ],
  providers: [
    InternalGrpcService,
    {
      provide: 'AUTH_SERVICE',
      useFactory: async (client: ClientGrpc) =>
        await client.getService('AuthService'),
      inject: ['AUTH_PACKAGE'],
    },
  ],
  exports: ['AUTH_SERVICE'],
})
export class InternalGrpcModule {}
