import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_DATABASE_SERVICE')
    private readonly databaseService: Repository<User> & {
      fullName: (id: string) => Promise<string>;
    }
  ) {}

  async create(createUserInput: CreateUserInput) {
    try {
      const user = new User(createUserInput);
      return await this.databaseService.save(user);
    } catch (error) {
      // Handle specific database-related errors here
      throw new Error(`Unable to create user: ${error.message}`);
    }
  }

  async findAll() {
    return await this.databaseService.find();
  }

  async findOne(id: string) {
    const user = await this.databaseService.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    // Implement the update logic using TypeORM query builder or other suitable methods
    // For demonstration purposes, returning a placeholder message
    return `This action updates a user with ID ${id}`;
  }

  async remove(id: string) {
    const userToRemove = await this.findOne(id); // Reusing findOne for error handling
    return await this.databaseService.remove(userToRemove);
  }

  public async paginate(
    options: IPaginationOptions
  ): Promise<Pagination<User>> {
    return paginate<User>(this.databaseService, options);
  }
}
