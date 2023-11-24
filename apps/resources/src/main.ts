import { NestFactory } from '@nestjs/core';
import { ResourcesModule } from './resources.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(ResourcesModule, {
    transport: Transport.KAFKA,

    options: {
      client: {
        clientId: 'resources',
        brokers: ['kafka:9092'],
      },
      consumer: {
        groupId: 'resources-consumer',
      },
    },
  });
  app.listen(() => console.log('Microservice is listening'));
}
bootstrap();
