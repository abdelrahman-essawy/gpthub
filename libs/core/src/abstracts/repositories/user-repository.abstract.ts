// import { UserDocument as MongoDocument } from '../frameworks/databases/mongo/model/user.model';
import { IRepository } from './repository.abstract';
import { User } from '../../../../../apps/backend/apps/users/src/app/entities/user.entity';

// import { User } from '@prisma/client';

export interface OptionsForFind {
  hideKeysFromReturn?: string[];
}

/**
 * Interface for the UserRepository.
 */
export interface IUserRepository extends IRepository<User> {
  findByUsername(
    username: string,
    options?: OptionsForFind
  ): Promise<Partial<User> | null>;

  findByEmail(
    email: string,
    options?: OptionsForFind
  ): Promise<Partial<User> | null>;

  isEmailExists(email: string): Promise<boolean>;

  isUsernameExists(username: string): Promise<boolean>;

  findByUsernameOrEmail(
    username: string,
    email: string,
    options?: OptionsForFind
  ): Promise<Partial<User> | null>;
}
