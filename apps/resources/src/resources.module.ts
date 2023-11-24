import { Module } from '@nestjs/common';
import { ResourcesController } from './resources.controller';
import { ResourcesService } from './resources.service';
import { KafkaModule } from 'libs/shared/kafka';

@Module({
  imports: [KafkaModule],
  controllers: [ResourcesController],
  providers: [ResourcesService],
})
export class ResourcesModule { }
