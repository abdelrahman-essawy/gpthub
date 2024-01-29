import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { RefreshJwtStrategy } from './refresh-jwt.strategy';

@Module({
  imports: [ConfigModule],
  providers: [JwtStrategy, RefreshJwtStrategy],
  exports: [JwtStrategy, RefreshJwtStrategy],
})
export class StrategiesModule {}
