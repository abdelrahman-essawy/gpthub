import { UserDocument } from '../model/user.model';
import { Model } from 'mongoose';
import { IMongoRepository } from '../repository';
import { IUserRepository } from 'src/core/abstracts/repositories/user-repository.abstract';

/**
 * MongoDB repository for User.
 */
export class MongoUserRepository
  extends IMongoRepository<UserDocument>
  implements IUserRepository
{
  constructor(_repository: Model<UserDocument>) {
    super(_repository);
  }

  async findByUsername(username: string): Promise<UserDocument | null> {
    return this.repository.findOne({ username }).exec();
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.repository.findOne({ email }).exec();
  }

  async isEmailExists(email: string): Promise<boolean> {
    const user = await this.findByEmail(email);
    return user !== null;
  }

  async isUsernameExists(username: string): Promise<boolean> {
    const user = await this.findByUsername(username);
    return user !== null;
  }
}
