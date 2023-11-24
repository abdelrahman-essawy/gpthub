import { NestFactory } from '@nestjs/core';
import { ResourceProcessingModule } from './resources.module';

async function bootstrap() {
  const app = await NestFactory.create(ResourceProcessingModule);
  await app.listen(3010);
}
bootstrap();
