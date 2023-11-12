import { UserDocument } from 'src/frameworks/databases/mongo/model/user.model';
import { IRepository } from './repository.abstract';

export interface OptionsForFind {
  hideKeysFromReturn?: string[];
}

/**
 * Interface for the UserRepository.
 */
export interface IUserRepository extends IRepository<UserDocument> {
  findByUsername(
    username: string,
    options?: OptionsForFind,
  ): Promise<UserDocument | null>;

  findByEmail(
    email: string,
    options?: OptionsForFind,
  ): Promise<UserDocument | null>;

  isEmailExists(email: string): Promise<boolean>;

  isUsernameExists(username: string): Promise<boolean>;

  findByUsernameOrEmail(
    usernameOrEmail: string,
    options?: OptionsForFind,
  ): Promise<UserDocument>;

  getUserPasswordByUsername(username: string): Promise<string>;

  getUserPasswordByEmail(email: string): Promise<string>;

  getUserPasswordById(id: string): Promise<string>;
}
