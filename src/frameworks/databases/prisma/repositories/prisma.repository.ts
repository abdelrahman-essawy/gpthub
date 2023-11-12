import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  IPrismaUserAuthRepository,
  OptionsForFind,
} from 'src/core/abstracts/repositories/user-auth-prisma.abstract';
import { UserPrismaDocument } from '../model/user.model';

@Injectable()
export class PrismaRepository implements IPrismaUserAuthRepository {
  constructor(private prisma: PrismaService) {}
  findByUsername(
    username: string,
    options?: OptionsForFind,
  ): Promise<UserPrismaDocument> {
    throw new Error('Method not implemented.');
  }
  findByEmail(
    email: string,
    options?: OptionsForFind,
  ): Promise<UserPrismaDocument> {
    throw new Error('Method not implemented.');
  }
  async isEmailExists(email: string): Promise<boolean> {
    return !!(await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    }));
  }
  // check
  async isUsernameExists(username: string): Promise<boolean> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          username: username,
        },
      });

      return !!user; // Convert user object to boolean
    } catch (error) {
      console.error('Error checking username existence:', error);
      return false; // Return false in case of an error
    }
  }
  findByUsernameOrEmail(
    usernameOrEmail: string,
    options?: OptionsForFind,
  ): Promise<UserPrismaDocument> {
    throw new Error('Method not implemented.');
  }
  getUserPasswordByUsername(username: string): Promise<string> {
    throw new Error('Method not implemented.');
  }
  getUserPasswordByEmail(email: string): Promise<string> {
    throw new Error('Method not implemented.');
  }
  getUserPasswordById(id: string): Promise<string> {
    throw new Error('Method not implemented.');
  }
  async create(data: Partial<UserPrismaDocument>): Promise<UserPrismaDocument> {
    // throw new Error('Method not implemented.');
    return await this.prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
        email: data.email,
        username: data.username,
        avatar: data.avatar,
        role: data.role,
      },
    });
  }
  update(
    id: string,
    data: Partial<UserPrismaDocument>,
    options: OptionsForFind,
  ): Promise<UserPrismaDocument> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<UserPrismaDocument> {
    const user = this.prisma.user.findFirst({
      where: { id: id },
    });
    this.prisma.user.delete({
      where: { id: id },
    });
    return user;
  }

  // why return a thing bro
  async deleteAll(): Promise<UserPrismaDocument[]> {
    await this.prisma.user.deleteMany({});
    return [];
  }
  find(options: OptionsForFind): Promise<UserPrismaDocument[]> {
    throw new Error('Method not implemented.');
  }
  findOneById(
    id: string,
    options: { hideKeysFromReturn?: string[] },
  ): Promise<UserPrismaDocument> {
    throw new Error('Method not implemented.');
  }
  async count(): Promise<number> {
    return this.prisma.user.count({});
  }
  search(query: string): Promise<UserPrismaDocument[]> {
    throw new Error('Method not implemented.');
  }
}
