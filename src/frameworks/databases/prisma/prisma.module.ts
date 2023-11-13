// src/prisma.module.ts

import { Module } from '@nestjs/common';
import { PrismaDatabaseService } from './prisma-database.service';
import { PrismaClient } from '@prisma/client';
import { DatabaseServices } from 'src/core/abstracts/services/database-service.abstract';

@Module({
  providers: [
    {
      provide: DatabaseServices,
      useClass: PrismaDatabaseService,
    },
    PrismaClient,
  ],
  exports: [
    {
      provide: DatabaseServices,
      useClass: PrismaDatabaseService,
    },
  ],
})
export class PrismaDatabaseServiceModule { }
