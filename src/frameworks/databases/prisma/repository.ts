import { PrismaClient } from '@prisma/client';
import { NotAcceptableException } from '@nestjs/common';
import { IRepository } from 'src/core/abstracts/repositories/repository.abstract';
import { OptionsForFind } from 'src/core/abstracts/repositories/user-repository.abstract';
import { User } from 'src/core/entities/user.entity';
import { UserPrismaDocument } from './model/user.model';
import { isUUID } from 'class-validator';

/**
 * Prisma repository for handling CRUD operations on a specific entity.
 * @template T - The entity type.
 */
export class PrismaRepository implements IRepository<UserPrismaDocument> {
  readonly prisma: PrismaClient;
  readonly populateOnFind: string[];

  private createBooleanObject(hideKeysFromReturn: string[] = []) {
    const keys = Object.keys(this.prisma.user.fields);
    const otherKeys = keys.filter((key) => !hideKeysFromReturn.includes(key));
    return otherKeys.reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
  }

  private validateId(id: string) {
    if (!id || !isUUID(id)) {
      throw new NotAcceptableException({ message: 'Invalid ID' });
    }
  }

  constructor(prisma: PrismaClient, populateOnFind: string[] = []) {
    this.prisma = prisma;
    this.populateOnFind = populateOnFind;
  }

  async find(options: OptionsForFind = {}) {
    return this.prisma.user.findMany({
      select: this.createBooleanObject(options.hideKeysFromReturn),
    });
  }

  async findOneById(id: string, options: OptionsForFind = {}) {
    this.validateId(id);

    return this.prisma.user.findUnique({
      where: {
        id,
      },
      select: this.createBooleanObject(options.hideKeysFromReturn),
    });
  }

  async create(data: any) {
    return this.prisma.user.create(data);
  }

  async update(id: string, item: Partial<User>, options: OptionsForFind) {
    this.validateId(id);

    return this.prisma.user.update({
      where: {
        id,
      },
      data: item,
    });
  }

  async delete(id: string) {
    this.validateId(id);

    return this.prisma.user.delete({
      where: {
        id,
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

  async search(query: string) {
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
