import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaUserRepository } from './repositories';
import { DatabaseService, IPrismaDatabaseService } from '@core';

@Injectable()
export class PrismaDatabaseService implements DatabaseService {
  constructor(private readonly prisma: PrismaClient) {
    this.prisma.$connect();
  }

  sql: IPrismaDatabaseService = {
    user: new PrismaUserRepository(this.prisma.user),
  };

  // async onApplicationBootstrap() {
  //   this.sql = {
  //     user: new PrismaUserRepository(this.prisma.user),
  //   };
  // }
}
