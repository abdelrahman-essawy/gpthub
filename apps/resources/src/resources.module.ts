import { Module, OnModuleInit } from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { KafkaModule } from 'libs/shared/kafka';
import { ResourcesUseCases } from './use-cases/resource/resource.use-case';
import { DatabaseServicesModule } from 'libs/shared/databases';

@Module({
  imports: [KafkaModule, DatabaseServicesModule],
  providers: [ResourcesService, ResourcesUseCases],
  exports: [ResourcesService],
})
export class ResourcesModule { }
