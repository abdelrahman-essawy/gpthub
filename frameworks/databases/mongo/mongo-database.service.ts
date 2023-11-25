import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DatabaseServices, IMongoDatabaseService } from 'core/abstracts';
import { Resource, ResourceDocument } from './model/resource.model';
import { MongoResourceRepository } from './repositories/resource.repository';

@Injectable()
export class MongoDatabaseService
  implements DatabaseServices, OnApplicationBootstrap {
  nosql?: IMongoDatabaseService;

  constructor(
    // @InjectModel(User.name)
    // private readonly userRepositoryModel: Model<UserDocument>,
    @InjectModel(Resource.name)
    private readonly resourceRepositoryModel: Model<ResourceDocument>,
  ) { }

  onApplicationBootstrap() {
    this.nosql = {
      // user: new MongoUserRepository(this.userRepositoryModel),
      resource: new MongoResourceRepository(this.resourceRepositoryModel),
    };
  }
}
