import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaUserRepository } from './repositories';
import { DatabaseService, ISQLDatabaseService } from '@core';

@Injectable()
export class PrismaDatabaseService implements DatabaseService {
  sql: ISQLDatabaseService = {
    user: new PrismaUserRepository(this.prisma.user),
  };

  constructor(private readonly prisma: PrismaClient) {
    this.prisma.$connect();
  }

  // async onApplicationBootstrap() {
  //   this.sql = {
  //     user: new PrismaUserRepository(this.prisma.user),
  //   };
  // }
}
