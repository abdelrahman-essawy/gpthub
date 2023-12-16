import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthModule } from './app/auth.module';
import { grpcClientOptions } from './app/gprc-client-options';

async function bootstrap() {
  // gRPC Microservice
  const grpcApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    grpcClientOptions
  );

  const httpApp = await NestFactory.create(AuthModule);
  const globalPrefix = '/';
  httpApp.setGlobalPrefix(globalPrefix);
  httpApp.useGlobalPipes(new ValidationPipe());
  httpApp.enableCors();
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
