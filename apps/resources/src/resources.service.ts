import { OnModuleInit } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ConsumerService } from 'libs/shared/kafka';

@Injectable()
export class ResourcesService implements OnModuleInit {
  constructor(private readonly consumerService: ConsumerService) { }
  async getHello(): Promise<string> {
    // console.log('consumer service: ');
    return 'Hello World!';
  }

  async onModuleInit() {
    await this.consumerService.consume(
      {
        topics: ['RESOURCE_PROCESS'],
      },
      {
        eachMessage: async ({ topic, partition, message }) => {
          console.log(message.value.toString());
        },
      },
    );
  }
}
