// src/prisma.module.ts

import { Module } from '@nestjs/common';
import { PrismaDatabaseService } from './prisma-database.service';
import { PrismaClient } from '@prisma/client';
import { DatabaseServices } from 'src/core/abstracts/services/database-service.abstract';

@Module({
  imports: [PrismaClient],
  providers: [PrismaDatabaseService, PrismaClient],
  exports: [PrismaDatabaseService, PrismaClient],
})
export class PrismaDatabaseServiceModule {
  prisma: PrismaClient;
  constructor(private readonly prisma2: PrismaClient) {
    this.prisma = prisma2;
  }
  async onApplicationBootstrap() {}
}
