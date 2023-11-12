import { Module } from '@nestjs/common';
import { MongoDatabaseServiceModule } from 'src/frameworks/databases/mongo/mongo.module';

@Module({
  imports: [MongoDatabaseServiceModule, PrismaDatabaseServiceModule],
  exports: [MongoDatabaseServiceModule],
})
export class DatabaseServicesModule {}
