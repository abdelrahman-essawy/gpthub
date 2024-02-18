import { Logger, Module } from '@nestjs/common';
import { GithubStrategyModule } from './github/github.module';
import { GoogleStrategyModule } from './google/google.module';

@Module({
  imports: [GoogleStrategyModule, GithubStrategyModule],
  providers: [Logger],
})
export class SocialStrategiesModule {}
