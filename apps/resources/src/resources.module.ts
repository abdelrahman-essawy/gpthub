import { Module } from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { KafkaModule } from 'libs/shared/kafka';

@Module({
  imports: [KafkaModule],
  providers: [ResourcesService],
})
export class ResourcesModule { }
