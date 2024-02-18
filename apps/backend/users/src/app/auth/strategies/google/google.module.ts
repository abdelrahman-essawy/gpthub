import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './google.strategy';
import { Module } from '@nestjs/common';
import { GoogleStrategyController } from './google.controller';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'google' })],
  providers: [GoogleStrategy],
  controllers: [GoogleStrategyController],
})
export class GoogleStrategyModule {}
