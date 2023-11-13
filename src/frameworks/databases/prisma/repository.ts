// @ts-nocheck

import { PrismaClient } from '@prisma/client';
import { NotAcceptableException } from '@nestjs/common';
import { IRepository } from 'src/core/abstracts/repositories/repository.abstract';
import { OptionsForFind } from 'src/core/abstracts/repositories/user-repository.abstract';
import { User } from 'src/core/entities/user.entity';

/**
 * Prisma repository for handling CRUD operations on a specific entity.
 * @template T - The entity type.
 */
export class PrismaRepository implements IRepository<User> {
  readonly prisma: PrismaClient;
  readonly populateOnFind: string[];

  constructor(prisma: PrismaClient, populateOnFind: string[] = []) {
    this.prisma = prisma;
    this.populateOnFind = populateOnFind;
  }

  async find(options: OptionsForFind = {}): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOneById(
    id: string,
    options: OptionsForFind = {},
  ): Promise<User | null> {
    if (!id || isNaN(+id)) {
      throw new NotAcceptableException({ message: 'Invalid ID' });
    }

    // Implement your logic using Prisma queries
    return this.prisma.user.findUnique({
      where: {
        id: +id,
      },
    });
  }

  async create(item: Partial<User>): Promise<User> {
    // Implement your logic using Prisma queries
    return this.prisma.user.create({
      data: item,
    });
  }

  async update(
    id: string,
    item: Partial<User>,
    options: OptionsForFind,
  ): Promise<User | null> {
    if (!id || isNaN(+id)) {
      throw new NotAcceptableException({ message: 'Invalid ID' });
    }

    // Implement your logic using Prisma queries
    return this.prisma.user.update({
      where: {
        id: +id,
      },
      data: item,
    });
  }

  async delete(id: string): Promise<User | null> {
    if (!id || isNaN(+id)) {
      throw new NotAcceptableException({ message: 'Invalid ID' });
    }

    // Implement your logic using Prisma queries
    return this.prisma.user.delete({
      where: {
        id: +id,
      },
    });
  }

  async deleteAll(): Promise<any> {
    // Implement your logic using Prisma queries
    return this.prisma.user.deleteMany({});
  }

  async count(): Promise<number> {
    // Implement your logic using Prisma queries
    return this.prisma.user.count();
  }

  async search(query: string): Promise<User[]> {
    // Implement your logic using Prisma queries for search
    return this.prisma.user.findMany({
      where: {
        OR: [
          // Specify fields for search
        ],
      },
    });
  }
}
