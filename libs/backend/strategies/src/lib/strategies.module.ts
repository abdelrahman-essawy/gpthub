import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import {
  InternalCommunicationsModule,
  InternalCommunicationsService,
} from '@backend/internal-communications';

import { JwtStrategy } from './jwt.strategy';
import { RefreshJwtStrategy } from './refresh-jwt.strategy';

@Module({
  imports: [ConfigModule, InternalCommunicationsModule],
  providers: [JwtStrategy, RefreshJwtStrategy, InternalCommunicationsService],
  exports: [JwtStrategy, RefreshJwtStrategy],
})
export class StrategiesModule {}
