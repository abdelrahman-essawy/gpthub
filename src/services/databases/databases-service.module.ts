import { Module } from '@nestjs/common';
import { MongoDatabaseServiceModule } from 'src/frameworks/databases/mongo/mongo.module';
import { PrismaDatabaseServiceModule } from 'src/frameworks/databases/prisma/prisma.module';

@Module({
  imports: [MongoDatabaseServiceModule, PrismaDatabaseServiceModule],
  exports: [MongoDatabaseServiceModule, PrismaDatabaseServiceModule],
})
export class DatabaseServicesModule { }
