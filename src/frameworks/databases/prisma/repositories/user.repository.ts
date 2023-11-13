// src/repositories/user.repository.ts

import { PrismaClient } from '@prisma/client';
import { IRepository } from 'src/core/abstracts/repositories/repository.abstract';
import { User } from 'src/core/entities/user.entity';
import { PrismaRepository } from '../repository';

export class PrismaUserRepository
  extends PrismaRepository
  implements IRepository<User>
{
  constructor(prisma: PrismaClient) {
    super(prisma);
  }
}
