import { PassportModule } from '@nestjs/passport';
import { GithubStrategy } from './github.strategy';
import { Module } from '@nestjs/common';
import { GithubStrategyController } from './github.controller';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'github' })],
  providers: [GithubStrategy],
  controllers: [GithubStrategyController],
})
export class GithubStrategyModule {}
