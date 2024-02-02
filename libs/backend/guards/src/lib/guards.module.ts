import { Module } from '@nestjs/common';
import { StrategiesModule } from '@backend/strategies';

@Module({
  imports: [StrategiesModule],
  providers: [],
  exports: [],
})
export class GuardsModule {}
