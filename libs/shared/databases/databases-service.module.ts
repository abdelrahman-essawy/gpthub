import { Module } from '@nestjs/common';
import { DatabaseServices } from 'core/abstracts';
import {
  PrismaDatabaseServiceModule,
  MongoDatabaseServiceModule,
  PrismaDatabaseService,
  MongoDatabaseService,
} from 'frameworks/databases';

@Module({
  imports: [PrismaDatabaseServiceModule, MongoDatabaseServiceModule],
  providers: [
    {
      provide: DatabaseServices,
      useFactory(prisma: PrismaDatabaseService, mongo: MongoDatabaseService) {
        prisma.onModuleInit();
        mongo.onModuleInit();
        return {
          sql: prisma.sql,
          nosql: mongo.nosql,
        };
      },
      inject: [PrismaDatabaseService, MongoDatabaseService],
    },
  ],
  exports: [
    {
      provide: DatabaseServices,
      useFactory(prisma: PrismaDatabaseService, mongo: MongoDatabaseService) {
        prisma.onModuleInit();
        mongo.onModuleInit();
        return {
          sql: prisma.sql,
          nosql: mongo.nosql,
        };
      },
    },
  ],
})
export class DatabaseServicesModule { }
