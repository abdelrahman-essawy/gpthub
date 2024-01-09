import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { TypeOrmQueryService } from '@ptc-org/nestjs-query-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUserRepository } from '@core';

@Injectable()
export class UsersService
  extends TypeOrmQueryService<UserEntity>
  implements IUserRepository
{
  constructor(
    @InjectRepository(UserEntity)
    readonly userRepository: Repository<UserEntity>,
  ) {
    super(userRepository);
  }

  async findByUsernameOrEmail(
    username?: string,
    email?: string,
  ): Promise<UserEntity | null> {
    return await this.userRepository.findOne({
      where: [{ username }, { email }],
      comment: 'Find user by username or email',
    });
  }
}
