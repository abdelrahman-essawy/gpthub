import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaUserRepository } from './repositories/user.repository';
import { IUserRepository } from 'src/core/abstracts/repositories/user-repository.abstract';
import {
  DatabaseServices,
  IPrismaDatabaseService,
} from 'src/core/abstracts/services/database-service.abstract';

@Injectable()
export class PrismaDatabaseService
  implements DatabaseServices, OnApplicationBootstrap {
  constructor(private readonly prisma: PrismaClient) {
    this.prisma.$connect();
  }

  sql: IPrismaDatabaseService;

  async onApplicationBootstrap() {
    this.sql = {
      user: new PrismaUserRepository(this.prisma.user),
    };
  }
}
