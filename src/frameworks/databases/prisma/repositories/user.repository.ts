// src/repositories/prisma-user.repository.ts

// @ts-nocheck
import { PrismaClient, User } from '@prisma/client';
import { IRepository } from 'src/core/abstracts/repositories/repository.abstract';
import { IUserRepository } from 'src/core/abstracts/repositories/user-repository.abstract';
import { PrismaRepository } from '../repository';

export class PrismaUserRepository
  extends PrismaRepository
  implements IUserRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    super(prisma);
  }

  async find(options: any): Promise<User[]> {
    // Implement your logic using Prisma queries
    return this.prisma.user.findMany({
      // add your Prisma query options here
    });
  }

  async findByUsername(username: string, options: any): Promise<User | null> {
    // Implement your logic using Prisma queries
    return this.prisma.user.findUnique({
      where: {
        username: username,
      },
    });
  }

  async findByEmail(email: string, options: any): Promise<User | null> {
    // Implement your logic using Prisma queries
    return this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async isEmailExists(email: string): Promise<boolean> {
    const user = await this.findByEmail(email);
    return user !== null;
  }

  async isUsernameExists(username: string): Promise<boolean> {
    const user = await this.findByUsername(username);
    return user !== null;
  }

  async findByUsernameOrEmail(
    usernameOrEmail: string,
    options: any,
  ): Promise<User | null> {
    // Implement your logic using Prisma queries
    return this.prisma.user.findFirst({
      where: {
        OR: [
          {
            username: usernameOrEmail,
          },
          {
            email: usernameOrEmail,
          },
        ],
      },
    });
  }

  async getUserPasswordByUsername(username: string): Promise<string | null> {
    // Implement your logic using Prisma queries
    const user = await this.findByUsername(username, {});
    return user ? user.password : null;
  }

  async getUserPasswordByEmail(email: string): Promise<string | null> {
    // Implement your logic using Prisma queries
    const user = await this.findByEmail(email, {});
    return user ? user.password : null;
  }

  async getUserPasswordById(id: string): Promise<string | null> {
    // Implement your logic using Prisma queries
    const user = await this.prisma.user.findUnique({
      where: {
        id: parseInt(id, 10),
      },
    });
    return user ? user.password : null;
  }
}
