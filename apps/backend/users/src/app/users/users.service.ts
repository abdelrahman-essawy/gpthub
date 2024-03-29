import { Injectable } from '@nestjs/common';
import { TypeOrmQueryService } from '@ptc-org/nestjs-query-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUserRepository } from '@core';

import { UserEntity } from './entities/user.entity';

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

  async findByUsernameOrEmailOrFail(
    username?: string,
    email?: string,
  ): Promise<UserEntity | null> {
    return await this.userRepository.findOneOrFail({
      where: [{ username }, { email }],
      comment: 'Find user by username or email',
    });
  }

  async updateRefreshToken(id: string, refreshToken: string) {
    await this.userRepository.update(id, {
      hashedRefreshToken: refreshToken,
    });
  }
}
