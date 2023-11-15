import { UserDocument as MongoDocument } from 'src/frameworks/databases/mongo/model/user.model';
import { IRepository } from './repository.abstract';
import { User as PrismaDocument } from '@prisma/client';

export interface OptionsForFind {
  hideKeysFromReturn?: string[];
}
type User = PrismaDocument | MongoDocument;

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
