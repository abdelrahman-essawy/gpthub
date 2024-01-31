import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { RefreshJwtStrategy } from './refresh-jwt.strategy';
import { ClientsModule, Transport } from '@nestjs/microservices';

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
        },
      },
    ]),
  ],
  providers: [JwtStrategy, RefreshJwtStrategy],
  exports: [JwtStrategy, RefreshJwtStrategy],
})
export class StrategiesModule {}
