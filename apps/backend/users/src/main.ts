/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cors from 'cors';
import { AppModule } from './app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe());
  const globalPrefix = 'graphql';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3001;

  // CORS configuration
  app.use(
    cors({
      origin: '*', // Change this to the specific origin of your frontend in production
      credentials: true,
    }),
  );

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
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
