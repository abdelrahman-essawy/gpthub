import { OnApplicationBootstrap, OnModuleInit } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ConsumerService, TOPICS } from 'libs/shared/kafka';

@Injectable()
export class ResourcesService implements OnApplicationBootstrap {
  constructor(private readonly consumerService: ConsumerService) { }

  async onApplicationBootstrap() {
    await this.consumerService.consume({
      topic: { topic: TOPICS.RESOURCE_PROCESS },
      config: {
        groupId: 'resource-process',
      },
      onMessage: async (message) => {
        console.log('message: ', message.value.toString());
      },
    });
  }
}
