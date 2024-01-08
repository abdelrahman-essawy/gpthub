// import { TDocument as MongoDocument } from '../frameworks/databases/mongo/model/T.model';
import { IUser } from '../../interfaces';

// import { T } from '@prisma/client';

export interface OptionsForFind {
  hideKeysFromReturn?: string[];
}

/**
 * Interface for the TRepository.
 */
export interface IUserRepository {
  // findByName(
  //   name: string,
  //   options?: OptionsForFind,
  // ): Promise<Partial<IUser> | null>;

  // findByEmail(
  //   email: string,
  //   options?: OptionsForFind,
  // ): Promise<Partial<IUser> | null>;

  // isEmailExists(email: string): Promise<boolean>;

  // isNameExists(name: string): Promise<boolean>;

  findByUsernameOrEmail(name?: string, email?: string): Promise<IUser | null>;
}
