/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ResourcesModule } from './app/resources.module';
import cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(ResourcesModule);
  const globalPrefix = 'graphql';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3002;
  await app.listen(port);
  app.use(
    cors({
      origin: '*',
    })
  );
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
