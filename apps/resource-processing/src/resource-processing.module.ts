import { Module } from '@nestjs/common';
import { ResourceProcessingController } from './resource-processing.controller';
import { ResourceProcessingService } from './resource-processing.service';

@Module({
  imports: [],
  controllers: [ResourceProcessingController],
  providers: [ResourceProcessingService],
})
export class ResourceProcessingModule {}
