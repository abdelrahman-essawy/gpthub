import { Prisma, PrismaClient, User } from '@prisma/client';
import { NotAcceptableException } from '@nestjs/common';
import { IRepository } from 'src/core/abstracts/repositories/repository.abstract';
import { OptionsForFind } from 'src/core/abstracts/repositories/user-repository.abstract';
import { isUUID } from 'class-validator';
import { DefaultArgs } from '@prisma/client/runtime/library';

/**
 * Prisma repository for handling CRUD operations on a specific entity.
 * @template T - The entity type.
 */
export class PrismaRepository<T extends PrismaClient['user']>
  implements IRepository<T>
{
  readonly repository: T;
  readonly populateOnFind: string[];

  createBooleanObject(hideKeysFromReturn: string[] = []) {
    const keys = Object.keys(this.repository.fields);
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

  constructor(repository: any, populateOnFind: string[] = []) {
    this.repository = repository;
    this.populateOnFind = populateOnFind;
  }

  async find(options: OptionsForFind = {}) {
    return this.repository.findMany({
      select: this.createBooleanObject(options.hideKeysFromReturn),
    });
  }

  async findOneById(id: string, options: OptionsForFind = {}) {
    console.log('findOneById');
    this.validateId(id);

    return this.repository.findUnique({
      where: {
        id,
      },
      select: this.createBooleanObject(options.hideKeysFromReturn),
    });
  }

  async create(data: any): Promise<any> {
    return this.repository.create({
      data,
    });
  }

  async update(id: string, data: any, options: OptionsForFind): Promise<any> {
    this.validateId(id);

    return this.repository.update({
      where: {
        id,
      },
      data,
      select: this.createBooleanObject(options.hideKeysFromReturn),
    });
  }

  async delete(id: string): Promise<any> {
    this.validateId(id);

    return this.repository.delete({
      where: {
        id,
      },
    });
  }

  async deleteAll(): Promise<any> {
    // Implement your logic using Prisma queries
    return this.repository.deleteMany({});
  }

  async count(): Promise<number> {
    // Implement your logic using Prisma queries
    return this.repository.count();
  }

  async search(query: string): Promise<any> {
    // Implement your logic using Prisma queries for search
    return this.repository.findMany({
      where: {
        OR: [
          // Specify fields for search
        ],
      },
    });
  }
}
