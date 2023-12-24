import { Inject, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_DATABASE_SERVICE')
    private readonly databaseService: Repository<User> & {
      fullName: (id: string) => Promise<string>;
    }
  ) {}

  create(createUserInput: CreateUserInput) {
    return this.databaseService.manager.save(new User(createUserInput));
  }

  findAll() {
    return this.databaseService.find();
  }

  findOne(id: string) {
    return this.databaseService.findOneBy({ id });
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
