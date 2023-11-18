import { Module } from '@nestjs/common';
import { DatabaseServices } from '../../core/abstracts/services/database-service.abstract';
import { MongoDatabaseService } from '../../frameworks/databases/mongo/mongo-database.service';
import { MongoDatabaseServiceModule } from '../../frameworks/databases/mongo/mongo.module';
import { PrismaDatabaseService } from '../../frameworks/databases/prisma/prisma-database.service';
import { PrismaDatabaseServiceModule } from '../../frameworks/databases/prisma/prisma.module';

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
