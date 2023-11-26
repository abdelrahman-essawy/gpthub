import { OnApplicationBootstrap, OnModuleInit } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import {
  ConsumerService,
  KAFKA_CONFIG,
  ProducerService,
  TOPICS,
} from 'libs/shared/kafka';
import { ResourcesUseCases } from './use-cases/resource/resource.use-case';

@Injectable()
export class ResourcesService implements OnApplicationBootstrap {
  constructor(
    private readonly consumerService: ConsumerService,
    private readonly producerService: ProducerService,
    private readonly resourcesUseCases: ResourcesUseCases,
  ) { }

  async onApplicationBootstrap() {
    await this.consumerService.consume({
      topic: { topic: TOPICS.RESOURCES.CREATE },
      config: {
        groupId: KAFKA_CONFIG.groupId.RESOURCE,
      },
      onMessage: async ({ value }) =>
        this.resourcesUseCases.createResource(JSON.parse(value.toString())),
    });
  }
}
