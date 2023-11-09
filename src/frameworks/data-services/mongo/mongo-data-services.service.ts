import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IDatabaseService } from 'src/core/abstracts/data-service.abstract';
import { User, UserDocument } from './model/user.model';
import { Model } from 'mongoose';
import { MongoUserRepository } from './repositories/user.repository';

@Injectable()
export class MongoDatabaseService
  implements IDatabaseService, OnApplicationBootstrap {
  users: any;

  constructor(
    @InjectModel(User.name)
    private readonly userRepositoryModel: Model<UserDocument>,
  ) { }

  onApplicationBootstrap() {
    this.users = new MongoUserRepository(this.userRepositoryModel);
  }
}
