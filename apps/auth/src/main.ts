import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  MicroserviceOptions,
  Transport,
  KafkaOptions,
} from '@nestjs/microservices';
import { AppModule } from 'apps/api/src/app.module';
import { AUTHENTICATION_PACKAGE_NAME } from 'libs/shared/proto/auth/auth';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const config = new DocumentBuilder()
    .setTitle('Auth Microservice')
    .setDescription(
      'This microservice is responsible for anything related to authn/authz.',
    )
    .setVersion('0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  const grpcApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: AUTHENTICATION_PACKAGE_NAME,
        protoPath: 'libs/shared/proto/auth/auth.proto',
      },
    },
  );

  const kafkaApp = await NestFactory.createMicroservice<KafkaOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'kafka-client',
          brokers: ['kafka:9092'],
        },
        consumer: {
          groupId: 'kafka-group',
        },
      },
    },
  );

  await grpcApp.listen(); // Use default gRPC port (5000)
  await kafkaApp.listen(); // Use default Kafka port (9092)
  await app.listen(3020);
}
bootstrap();
