import { IRepository } from './repository.abstract';
import { UserPrismaDocument } from 'src/frameworks/databases/prisma/model/user.model';

export interface OptionsForFind {
  hideKeysFromReturn?: string[];
}

/**
 * Interface for the UserRepository.
 */
export interface IPrismaUserAuthRepository
  extends IRepository<UserPrismaDocument> {
  findByUsername(
    username: string,
    options?: OptionsForFind,
  ): Promise<UserPrismaDocument | null>;

  findByEmail(
    email: string,
    options?: OptionsForFind,
  ): Promise<UserPrismaDocument | null>;

  isEmailExists(email: string): Promise<boolean>;

  isUsernameExists(username: string): Promise<boolean>;

  findByUsernameOrEmail(
    usernameOrEmail: string,
    options?: OptionsForFind,
  ): Promise<UserPrismaDocument>;

  getUserPasswordByUsername(username: string): Promise<string>;

  getUserPasswordByEmail(email: string): Promise<string>;

  getUserPasswordById(id: string): Promise<string>;
}
