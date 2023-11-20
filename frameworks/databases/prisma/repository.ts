import { PrismaClient } from '@prisma/client';
import { NotAcceptableException } from '@nestjs/common';
import { isUUID } from 'class-validator';
import { IRepository, OptionsForFind } from 'core/abstracts';

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

  async find(
    options: OptionsForFind = {
      hideKeysFromReturn: [],
    },
  ) {
    return this.repository.findMany({
      select: this.createBooleanObject(options.hideKeysFromReturn),
    });
  }

  async findOneById(
    id: string,
    options: OptionsForFind = {
      hideKeysFromReturn: [],
    },
  ) {
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

  async update(
    id: string,
    data: any,
    options: OptionsForFind = {
      hideKeysFromReturn: [],
    },
  ): Promise<any> {
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