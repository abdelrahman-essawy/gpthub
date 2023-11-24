import { Module } from '@nestjs/common';
import { ResourceProcessingController } from './resources.controller';
import { ResourceProcessingService } from './resources.service';
import { KafkaModule } from 'libs/shared/kafka';

@Module({
  imports: [KafkaModule],
  controllers: [ResourceProcessingController],
  providers: [ResourceProcessingService],
})
export class ResourceProcessingModule { }
