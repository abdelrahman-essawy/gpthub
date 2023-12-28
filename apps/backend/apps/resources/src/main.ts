/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cors from 'cors';
import fastifyCsrfProtection from '@fastify/csrf-protection';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
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

  // CORS configuration
  app.use(
    cors({
      origin: '*', // Change this to the specific origin of your frontend in production
      credentials: true,
    })
  );

  // CSRF protection
  await app.register(fastifyCsrfProtection);

  // Set up routes for GraphQL playground
  app.use(`/${globalPrefix}`, (req, res, next) => {
    if (req.url.startsWith('/graphql')) {
      // Allow CSRF token header for Apollo Playground
      res.setHeader('Access-Control-Allow-Headers', 'csrf-token');
    }
    next();
  });

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
