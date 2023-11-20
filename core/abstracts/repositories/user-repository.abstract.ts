// import { UserDocument as MongoDocument } from '../frameworks/databases/mongo/model/user.model';
import { UserDocument } from 'frameworks/databases';
import { IRepository } from './repository.abstract';
import { User as PrismaDocument } from '@prisma/client';

export interface OptionsForFind {
  hideKeysFromReturn?: string[];
}
type User = PrismaDocument | UserDocument; // MongoDocument;

/**
 * Interface for the UserRepository.
 */
export interface IUserRepository extends IRepository<User> {
  findByUsername(
    username: string,
    options?: OptionsForFind,
  ): Promise<Partial<User> | null>;

  findByEmail(
    email: string,
    options?: OptionsForFind,
  ): Promise<Partial<User> | null>;

  isEmailExists(email: string): Promise<boolean>;

  isUsernameExists(username: string): Promise<boolean>;

  findByUsernameOrEmail(
    usernameOrEmail: string,
    options?: OptionsForFind,
  ): Promise<Partial<User>>;
}
