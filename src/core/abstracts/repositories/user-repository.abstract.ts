import { UserDocument } from 'src/frameworks/databases/mongo/model/user.model';
import { IRepository } from './repository.abstract';

export interface IUserRepository extends IRepository<UserDocument> {
  findByUsername(username: string): Promise<UserDocument | null>;
  findByEmail(email: string): Promise<UserDocument | null>;
  isEmailExists(email: string): Promise<boolean>;
  isUsernameExists(username: string): Promise<boolean>;
}
