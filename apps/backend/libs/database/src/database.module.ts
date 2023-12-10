import { Module } from '@nestjs/common';
import { PrismaDatabaseService, PrismaDatabaseServiceModule } from './prisma';
import { DatabaseService } from '@core';

@Module({
  imports: [PrismaDatabaseServiceModule],
  providers: [
    {
      provide: DatabaseService,
      useFactory(prisma: PrismaDatabaseService) {
        return {
          sql: prisma.sql,
        };
      },
      inject: [PrismaDatabaseService],
    },
  ],
  exports: [
    {
      provide: DatabaseService,
      useFactory(prisma: PrismaDatabaseService) {
        return {
          sql: prisma.sql,
        };
      },
    },
  ],
})
export class DatabaseModule {}
