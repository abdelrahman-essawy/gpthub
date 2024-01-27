import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { JwtModule } from '@backend/jwt';
import { HashingModule } from '@backend/hashing';

import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { LocalStrategy } from './strategies/local.strategy';
import { RefreshJwtStrategy } from './strategies/refresh-jwt.strategy';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,
    HashingModule,
    JwtModule,
    ConfigModule,
  ],
  exports: [AuthService],
  providers: [AuthService, JwtStrategy, LocalStrategy, RefreshJwtStrategy],
})
export class AuthModule {}
