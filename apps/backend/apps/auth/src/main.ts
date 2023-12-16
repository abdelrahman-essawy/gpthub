import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthModule } from './app/auth.module';
import { AUTHENTICATION_PACKAGE_NAME } from '@backend/generated';

// eslint-disable-next-line @nx/enforce-module-boundaries

async function bootstrap() {
  // gRPC Microservice
  const grpcApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.GRPC,
      options: {
        package: AUTHENTICATION_PACKAGE_NAME,
        protoPath: 'libs/core/proto/src/auth/auth.proto'
      },
    }
  );

  const httpApp = await NestFactory.create(AuthModule);
  const globalPrefix = '/';
  httpApp.setGlobalPrefix(globalPrefix);
  httpApp.useGlobalPipes(new ValidationPipe());
  httpApp.enableCors();
  grpcApp.useGlobalPipes(new ValidationPipe());
  const port = process.env.PORT || 3001;

  // Enable Swagger for the HTTP server
  const swaggerOptions = new DocumentBuilder()
    .setTitle('Authentication Microservice')
    .setDescription('API documentation for the Authentication microservice')
    .setVersion('1.0')
    .addBasicAuth()
    .addBearerAuth()
    .build();

  const swaggerDocument = SwaggerModule.createDocument(httpApp, swaggerOptions);
  SwaggerModule.setup('/', httpApp, swaggerDocument);

  // Start both gRPC and HTTP servers
  await Promise.all([grpcApp.listen(), await httpApp.listen(port)]);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );

  Logger.log('Auth microservice is running...');
}

bootstrap();
