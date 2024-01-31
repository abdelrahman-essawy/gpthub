/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';
import { TypeORMExceptionFilter } from '@backend/filters';
import cors from 'cors';

async function bootstrap() {
  const appGRPC = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'auth',
        protoPath: 'apps/backend/auth/src/proto/auth.proto',
        url: `localhost:${process.env.GRPC_AUTH_PORT ?? 50005}`,
      },
    },
  );

  await appGRPC.listen();
  Logger.log(`GRPC AUTH MS Application is running`);

  const appGQL = await NestFactory.create<NestExpressApplication>(AppModule);
  appGQL.use(cookieParser());

  appGQL.useGlobalPipes(new ValidationPipe());
  const globalPrefix = 'graphql';
  appGQL.setGlobalPrefix(globalPrefix);
  appGQL.useGlobalFilters(new TypeORMExceptionFilter());

  const port = process.env.PORT || 3005;

  // CORS configuration
  appGQL.use(
    cors({
      origin: '*', // Change this to the specific origin of your frontend in production
      credentials: true,
    }),
  );

  // Set up routes for GraphQL playground
  appGQL.use(`/${globalPrefix}`, (req, res, next) => {
    if (req.url.startsWith('/graphql')) {
      // Allow CSRF token header for Apollo Playground
      res.setHeader('Access-Control-Allow-Headers', 'csrf-token');
    }
    next();
  });

  await appGQL.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
