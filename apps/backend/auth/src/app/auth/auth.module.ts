import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';

import { StrategiesModule } from '@backend/strategies';
import { HashingModule } from '@backend/hashing';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { ClientGrpc, ClientsModule, Transport } from '@nestjs/microservices';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_ACCESS_SECRET'),
        signOptions: { expiresIn: '15m' },
      }),
    }),

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

    ConfigModule,
    HashingModule,
    StrategiesModule,
  ],
  providers: [
    AuthService,
    LocalStrategy,
    {
      provide: 'USERS_SERVICE',
      useFactory: (client: ClientGrpc) => client.getService('UsersService'),
      inject: ['USERS_PACKAGE'],
    },
    AuthResolver,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
