import { OptionsForFind } from './user-repository.abstract';

/**
 * Blueprint abstract class for a generic repository handling CRUD operations for entities of type T.
 */
export abstract class IRepository<T> {
  /**
   * Creates a new entity based on the provided data.
   * @param data - The partial data used to create the entity.
   * @returns A promise that resolves to the created entity of type T.
   */
  abstract create(data: Partial<T>): Promise<T>;

  /**
   * Updates an entity identified by its ID using the provided partial data.
   * @param id - The unique identifier of the entity to be updated.
   * @param data - The partial data used to update the entity.
   * @param options
   * @returns A promise that resolves to the updated entity of type T.
   */
  abstract update(
    id: string,
    data: Partial<T>,
    options?: OptionsForFind
  ): Promise<T>;

  /**
   * Deletes an entity by its unique identifier.
   * @param id - The unique identifier of the entity to be deleted.
   * @returns A promise that resolves to the deleted entity of type T.
   */
  abstract delete(id: string): Promise<T>;

  /**
   * Deletes all entities of type T.
   * @returns A promise that resolves to the deleted entities of type T.
   */
  abstract deleteAll(): Promise<T[]>;

  /**
   * Retrieves all entities of type T with an option to hide specified keys.
   * @param options - Options for dynamic key hiding during find operation.
   * @returns A promise that resolves to an array of entities of type T.
   */
  abstract find(options?: OptionsForFind): Promise<Partial<T>[]>;

  /**
   * Retrieves a single entity by its unique identifier with an option to hide specified keys.
   * @param id - The unique identifier of the entity to be retrieved.
   * @param options - Options for dynamic key hiding during find operation.
   * @returns A promise that resolves to the entity of type T.
   */
  abstract findOneById(
    id: string,
    options?: { hideKeysFromReturn?: string[] }
  ): Promise<Partial<T> | null>;

  /**
   * Retrieves the total count of entities of type T.
   * @returns A promise that resolves to the total count of entities.
   */
  abstract count(): Promise<number>;

  /**
   * Searches and retrieves entities of type T based on the provided criteria.
   * @returns A promise that resolves to an array of entities of type T that match the criteria.
   * @param query
   */
  abstract search(query: string): Promise<T[]>;
}
