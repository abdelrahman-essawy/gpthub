import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AUTH_PACKAGE_NAME } from '@global/proto';
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule,{
    transport: Transport.GRPC,
    options: {
      package: AUTH_PACKAGE_NAME,
      protoPath: 'libs/proto/src/auth/auth.proto',
    },
  });

  await app.listen()
    .then(() => {
      Logger.log('Auth microservice is listening...');
    })
    .catch(err => {
      Logger.error(err);
    })
}

bootstrap();
