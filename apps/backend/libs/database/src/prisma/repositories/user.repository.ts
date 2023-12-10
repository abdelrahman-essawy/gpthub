import { PrismaClient } from '@prisma/client';
import { PrismaRepository } from '../repository';
import { IUserRepository, OptionsForFind } from '@core';

export class PrismaUserRepository
  extends PrismaRepository<PrismaClient['user']>
  implements IUserRepository
{
  constructor(repository: PrismaClient['user']) {
    super(repository);
  }

  async findByUsername(username: string, options: OptionsForFind = {}) {
    return this.repository.findUnique({
      where: {
        username,
      },
      select: this.createBooleanObject(options.hideKeysFromReturn),
    });
  }

  async findByEmail(email: string, options: OptionsForFind = {}) {
    return this.repository.findUnique({
      where: {
        email,
      },
      select: this.createBooleanObject(options.hideKeysFromReturn),
    });
  }

  async isEmailExists(email: string): Promise<boolean> {
    const user = await this.findByEmail(email, {});
    return user !== null;
  }

  async isUsernameExists(username: string): Promise<boolean> {
    const user = await this.findByUsername(username);
    return user !== null;
  }
}
