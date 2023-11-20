import { Module } from '@nestjs/common';
import { ResourceProcessingController } from './resource-processing.controller';
import { ResourceProcessingService } from './resource-processing.service';
import { KafkaModule } from 'libs/shared/kafka';

@Module({
  imports: [KafkaModule],
  controllers: [ResourceProcessingController],
  providers: [ResourceProcessingService],
})
export class ResourceProcessingModule { }
