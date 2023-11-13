// src/prisma.module.ts

import { Module } from '@nestjs/common';
import { PrismaDatabaseService } from './prisma-database.service';
import { IDatabaseService } from 'src/core/abstracts/services/database-service.abstract';
import { PrismaClient } from '@prisma/client';

@Module({
  providers: [
    {
      provide: IDatabaseService,
      useClass: PrismaDatabaseService,
    },
    PrismaClient,
  ],
  exports: [
    {
      provide: IDatabaseService,
      useClass: PrismaDatabaseService,
    },
  ],
})
export class PrismaDatabaseServiceModule { }
