import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import {
  Consumer,
  ConsumerRunConfig,
  ConsumerSubscribeTopics,
  Kafka,
} from 'kafkajs';
import { TOPICS } from './constants';

@Injectable()
export class ConsumerService implements OnApplicationShutdown {
  private readonly kafka = new Kafka({
    brokers: ['kafka:9092'],
  });
  private readonly consumers: Consumer[] = [];

  async consume(
    topics: ConsumerSubscribeTopics & {
      topics: (keyof typeof TOPICS)[];
    },
    config: ConsumerRunConfig,
  ) {
    const consumer = this.kafka.consumer({
      groupId: 'test-group',
    });
    await consumer.connect();
    await consumer.subscribe(topics);
    await consumer.run(config);

    // collect consumers to close them later
    this.consumers.push(consumer);
  }

  onApplicationShutdown() {
    this.consumers.forEach(async (consumer) => {
      await consumer.disconnect();
    });
  }
}
