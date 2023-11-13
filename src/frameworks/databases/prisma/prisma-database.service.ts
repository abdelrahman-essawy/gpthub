// src/prisma-database.service.ts

import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { IDatabaseService } from 'src/core/abstracts/services/database-service.abstract';
import { PrismaUserRepository } from './repositories/user.repository';

@Injectable()
export class PrismaDatabaseService
  implements IDatabaseService, OnApplicationBootstrap {
  users: any;

  constructor(private readonly prisma: PrismaClient) { }

  async onApplicationBootstrap() {
    this.users = new PrismaUserRepository(this.prisma);
  }
}
