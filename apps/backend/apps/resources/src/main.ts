/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cors from 'cors';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastifyCsrfProtection from '@fastify/csrf-protection';
import { ResourcesModule } from './app/resources.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    ResourcesModule,
    new FastifyAdapter({
      logger: true,
    })
  );
  app.useGlobalPipes(new ValidationPipe());
  const globalPrefix = 'graphql';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3002;
  app.use(
    cors({
      origin: '*',
    })
  );
  await app.register(fastifyCsrfProtection);
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
