import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IDatabaseService } from 'src/core/abstracts/data-service.abstract';
import { User, UserDocument } from './model/user.model';
import { Model } from 'mongoose';
import { IMongoRepository } from './repository';
import { IRepository } from 'src/core/abstracts/repository.abstract';

@Injectable()
export class MongoDatabaseService
  implements IDatabaseService, OnApplicationBootstrap
{
  // @ts-expect-error asdas
  users: IRepository<UserDocument>;

  constructor(
    @InjectModel(User.name)
    private readonly userRepositoryModel: Model<UserDocument>,
  ) {}

  onApplicationBootstrap() {
    this.users = new IMongoRepository<UserDocument>(this.userRepositoryModel);
  }
}
