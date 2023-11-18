import { NestFactory } from '@nestjs/core';
import { ResourceProcessingModule } from './resource-processing.module';

async function bootstrap() {
  const app = await NestFactory.create(ResourceProcessingModule);
  await app.listen(3010);
}
bootstrap();
