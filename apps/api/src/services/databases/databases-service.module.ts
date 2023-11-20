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
        prisma.onApplicationBootstrap();
        mongo.onApplicationBootstrap();
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
      useClass: PrismaDatabaseService,
    },
  ],
})
export class DatabaseServicesModule { }
