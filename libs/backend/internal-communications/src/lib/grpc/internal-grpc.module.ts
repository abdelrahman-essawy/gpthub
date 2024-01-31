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
          protoPath: 'apps/backend/auth/src/proto/auth.proto',
          // @ts-ignore
          url: `localhost:${process.env.GRPC_AUTH_PORT ?? 50005}`,
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'USERS_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'users',
          protoPath: 'apps/backend/users/src/proto/users.proto',
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
    {
      provide: 'USERS_SERVICE',
      useFactory: async (client: ClientGrpc) =>
        await client.getService('UsersService'),
      inject: ['USERS_PACKAGE'],
    },
  ],
  exports: ['AUTH_SERVICE', 'USERS_SERVICE'],
})
export class InternalGrpcModule {}
