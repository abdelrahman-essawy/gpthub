import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseModule } from '@backend/database';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../strategies/local.strategy';
import { HashingModule } from '@backend/hashing';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'process';
import { GrpcReflectionModule } from 'nestjs-grpc-reflection';
import { grpcClientOptions } from './gprc-client-options';

@Module({
  imports: [
    DatabaseModule,
    PassportModule,
    HashingModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
    GrpcReflectionModule.register(grpcClientOptions),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
