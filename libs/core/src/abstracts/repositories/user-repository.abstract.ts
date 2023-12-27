// import { TDocument as MongoDocument } from '../frameworks/databases/mongo/model/T.model';
import { IRepository } from './repository.abstract';

// import { T } from '@prisma/client';

export interface OptionsForFind {
  hideKeysFromReturn?: string[];
}

/**
 * Interface for the TRepository.
 */
export interface ITRepository<T> extends IRepository<T> {
  findByTname(
    Tname: string,
    options?: OptionsForFind
  ): Promise<Partial<T> | null>;

  findByEmail(
    email: string,
    options?: OptionsForFind
  ): Promise<Partial<T> | null>;

  isEmailExists(email: string): Promise<boolean>;

  isTnameExists(Tname: string): Promise<boolean>;

  findByTnameOrEmail(
    Tname: string,
    email: string,
    options?: OptionsForFind
  ): Promise<Partial<T> | null>;
}
