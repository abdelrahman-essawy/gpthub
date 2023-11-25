import { NestFactory } from '@nestjs/core';
import { ResourcesModule } from './resources.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ResourcesModule,
    {
      transport: Transport.KAFKA,

      options: {
        client: {
          clientId: 'resources',
          brokers: ['kafka:9092'],
          retry: {
            restartOnFailure: async function() {
              return true;
            },
            retries: 100,
          },
        },
        consumer: {
          groupId: 'resources-consumer',
        },
      },
    },
  );
  app.listen();
}
bootstrap();
