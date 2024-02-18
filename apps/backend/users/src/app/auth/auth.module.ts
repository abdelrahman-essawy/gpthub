import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';

import { StrategiesModule } from '@backend/strategies';
import { HashingModule } from '@backend/hashing';
import { ConfigModule, ConfigService } from '@backend/config';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from '../users/users.module';
import { SocialStrategiesModule } from './strategies/social-strategies.module';
import { LocalStrategy } from './strategies/local.strategy';

@Global()
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

    UsersModule,

    ConfigModule,
    HashingModule,
    StrategiesModule,
    SocialStrategiesModule,
  ],
  providers: [AuthResolver, AuthService, LocalStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
