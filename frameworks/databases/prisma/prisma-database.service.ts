import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaUserRepository } from './repositories/user.repository';
import { DatabaseServices, IPrismaDatabaseService } from 'core/abstracts';

@Injectable()
export class PrismaDatabaseService implements DatabaseServices, OnModuleInit {
  constructor(private readonly prisma: PrismaClient) {
    this.prisma.$connect();
  }

  sql: IPrismaDatabaseService;

  onModuleInit() {
    this.sql = {
      user: new PrismaUserRepository(this.prisma.user),
    };
  }
}
