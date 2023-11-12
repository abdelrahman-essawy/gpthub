import {
  INestApplication,
  Injectable,
  OnModuleInit,
  OnApplicationShutdown,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnApplicationShutdown
{
  async onModuleInit() {
    await this.$connect();
  }

  onApplicationShutdown(signal?: string) {
    return this.$disconnect();
  }

  enableShutdownHooks(app: INestApplication) {
    app.enableShutdownHooks();
  }
}
