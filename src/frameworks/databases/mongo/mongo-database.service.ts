import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './model/user.model';
import { Model } from 'mongoose';
import { MongoUserRepository } from './repositories/user.repository';
import {
  DatabaseServices,
  IMongoDatabaseService,
} from 'src/core/abstracts/services/database-service.abstract';
import { IUserRepository } from 'src/core/abstracts/repositories/user-repository.abstract';

@Injectable()
export class MongoDatabaseService
  implements DatabaseServices, OnApplicationBootstrap {
  nosql?: IMongoDatabaseService;

  constructor(
    @InjectModel(User.name)
    private readonly userRepositoryModel: Model<UserDocument>,
  ) { }

  onApplicationBootstrap() {
    this.nosql = {
      user: new MongoUserRepository(this.userRepositoryModel),
    };
    // console.log('MongoDatabaseService.onApplicationBootstrap()');
    // console.log(this.nosql.user.count());
  }
}
