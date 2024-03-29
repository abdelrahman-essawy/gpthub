/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import cors from 'cors';
import { NestExpressApplication } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';

import { TypeORMExceptionFilter } from '@backend/filters';
import { AUTH_PACKAGE_NAME } from '@backend/proto';
import { AUTH_SERVICE_PROTO_PATH } from '@backend/internal-communications';

import { AuthModule } from './app/auth/auth.module';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const appGRPC = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.GRPC,
      options: {
        package: AUTH_PACKAGE_NAME,
        protoPath: AUTH_SERVICE_PROTO_PATH,
      },
    },
  );

  await appGRPC.listen();
  Logger.log('=============================');
  Logger.log(`GRPC USERS MS Application is running`);

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new TypeORMExceptionFilter());

  const port = process.env.PORT || 3001;

  // CORS configuration
  app.use(
    cors({
      origin: '*', // Change this to the specific origin of your frontend in production
      credentials: true,
    }),
  );

  // // Set up routes for GraphQL playground
  // app.use(`/graphql`, (req, res, next) => {
  //   if (req.url.startsWith('/graphql')) {
  //     // Allow CSRF token header for Apollo Playground
  //     res.setHeader('Access-Control-Allow-Headers', 'csrf-token');
  //   }
  //   next();
  // });

  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/graphql`);
}

bootstrap();
