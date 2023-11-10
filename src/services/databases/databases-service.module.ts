import { Module } from '@nestjs/common';
import { MongoDatabaseServiceModule } from 'src/frameworks/databases/mongo/mongo.module';

@Module({
  imports: [MongoDatabaseServiceModule],
  exports: [MongoDatabaseServiceModule],
})
export class DatabaseServicesModule { }
