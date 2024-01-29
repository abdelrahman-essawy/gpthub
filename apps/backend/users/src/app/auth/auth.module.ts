import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { JwtModule } from '@backend/jwt';
import { ConfigModule } from '@nestjs/config';
import { HashingModule } from '@backend/hashing';
import { StrategiesModule } from '@backend/strategies';

import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    PassportModule,

    JwtModule,
    ConfigModule,
    HashingModule,
    StrategiesModule,

    forwardRef(() => UsersModule),
  ],
  exports: [AuthService],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
