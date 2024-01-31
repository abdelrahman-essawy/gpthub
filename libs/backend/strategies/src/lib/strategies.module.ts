import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { RefreshJwtStrategy } from './refresh-jwt.strategy';
import { ClientGrpc, ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule,
    ClientsModule.register([
      {
        name: 'AUTH_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'auth',
          protoPath: 'apps/backend/auth/src/proto/auth.proto',
          url: `localhost:${process.env.GRPC_AUTH_PORT ?? 50005}`,
        },
      },
    ]),
  ],
  providers: [
    JwtStrategy,
    RefreshJwtStrategy,
    {
      provide: 'AUTH_SERVICE',
      useFactory: async (client: ClientGrpc) => {
        return await client.getClientByServiceName('AuthService');
      },
      inject: ['AUTH_PACKAGE'],
    },
  ],
  exports: [JwtStrategy, RefreshJwtStrategy],
})
export class StrategiesModule {}
