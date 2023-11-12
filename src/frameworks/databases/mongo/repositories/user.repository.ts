// MongoUserRepository
import { User, UserDocument } from '../model/user.model';
import { Model, Document } from 'mongoose';
import { IMongoRepository } from '../repository';
import {
  IUserRepository,
  OptionsForFind,
} from 'src/core/abstracts/repositories/user-repository.abstract';

/**
 * MongoDB repository for User.
 */
export class MongoUserRepository
  extends IMongoRepository<UserDocument>
  implements IUserRepository {
  constructor(_repository: Model<UserDocument>) {
    super(_repository);
  }

  async find(options: OptionsForFind = {}): Promise<UserDocument[]> {
    const { hideKeysFromReturn } = options;

    const projection: Record<string, 0 | 1> = {};
    if (hideKeysFromReturn) {
      hideKeysFromReturn.forEach((key) => {
        projection[key] = 0; // 0 means exclude the field
      });
    }

    return this.repository
      .find({}, projection, { lean: true })
      .select('-password')
      .exec();
  }

  async findByUsername(
    username: string,
    options: OptionsForFind = {},
  ): Promise<UserDocument | null> {
    const { hideKeysFromReturn } = options;

    const projection: Record<string, 0 | 1> = {};
    if (hideKeysFromReturn) {
      hideKeysFromReturn.forEach((key) => {
        projection[key] = 0; // 0 means exclude the field
      });
    }

    return this.repository.findOne({ username }, projection).exec();
  }

  async findByEmail(
    email: string,
    options: OptionsForFind = {},
  ): Promise<UserDocument | null> {
    const { hideKeysFromReturn } = options;

    const projection: Record<string, 0 | 1> = {};
    if (hideKeysFromReturn) {
      hideKeysFromReturn.forEach((key) => {
        projection[key] = 0; // 0 means exclude the field
      });
    }

    return this.repository.findOne({ email }, projection).exec();
  }

  async isEmailExists(email: string): Promise<boolean> {
    const user = await this.findByEmail(email);
    return user !== null;
  }

  async isUsernameExists(username: string): Promise<boolean> {
    const user = await this.findByUsername(username);
    return user !== null;
  }

  findByUsernameOrEmail(
    usernameOrEmail: string,
    options: OptionsForFind = {},
  ): Promise<UserDocument> {
    const { hideKeysFromReturn } = options;

    const isEmail = usernameOrEmail.includes('@');
    if (isEmail) {
      return this.findByEmail(usernameOrEmail, { hideKeysFromReturn });
    } else {
      return this.findByUsername(usernameOrEmail, { hideKeysFromReturn });
    }
  }

  async getUserPasswordByUsername(username: string): Promise<string> {
    return this.repository
      .findOne({ username })
      .select('password')
      .exec() as unknown as string;
  }

  async getUserPasswordByEmail(email: string): Promise<string> {
    return this.repository
      .findOne({ email })
      .select('password')
      .exec() as unknown as string;
  }

  async getUserPasswordById(id: string): Promise<string> {
    return this.repository
      .findById(id)
      .select('password')
      .exec() as unknown as string;
  }
}
