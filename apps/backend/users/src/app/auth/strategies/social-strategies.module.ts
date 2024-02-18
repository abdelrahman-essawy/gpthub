import { Logger, Module } from '@nestjs/common';
import { GithubStrategyModule } from './github/github.module';

@Module({
  imports: [GithubStrategyModule],
  providers: [Logger],
})
export class SocialStrategiesModule {}
