import { NotAcceptableException } from '@nestjs/common';
import { IRepository } from 'apps/api/src/core/abstracts/repositories/repository.abstract';
import { OptionsForFind } from 'apps/api/src/core/abstracts/repositories/user-repository.abstract';
import { Model, Document, Types } from 'mongoose';

/**
 * MongoDB repository for handling CRUD operations on a specific entity.
 * @template T - The entity type.
 */
export class IMongoRepository<T extends Document> implements IRepository<T> {
  readonly repository: Model<T>;
  readonly populateOnFind: string[];

  private projection(hideKeysFromReturn: string[]) {
    const projection: Record<string, 0 | 1> = {};
    if (hideKeysFromReturn) {
      hideKeysFromReturn.forEach((key) => {
        projection[key] = 0; // 0 means exclude the field
      });
    }
    return projection;
  }

  /**
   * Constructs an instance of IMongoRepository.
   * @param repository - The Mongoose model representing the entity.
   * @param populateOnFind - An array of fields to populate when finding entities.
   */
  constructor(repository: Model<T>, populateOnFind: string[] = []) {
    this.repository = repository;
    this.populateOnFind = populateOnFind;
  }

  /**
   * Retrieves all entities of type T with optional population of fields and dynamic key hiding.
   * @param options - Options for dynamic key hiding during find operation.
   * @returns A promise that resolves to an array of entities of type T.
   */
  async find(options: OptionsForFind = {}): Promise<T[]> {
    const projection = this.projection(options.hideKeysFromReturn);
    return this.repository
      .find({}, projection)
      .populate(this.populateOnFind)
      .exec();
  }

  /**
   * Retrieves a single entity of type T by its unique identifier with optional population of fields and dynamic key hiding.
   * @param id - The unique identifier of the entity to be retrieved.
   * @param options - Options for dynamic key hiding during find operation.
   * @returns A promise that resolves to the entity of type T if found, or null if not found.
   */
  async findOneById(
    id: string,
    options: OptionsForFind = {},
  ): Promise<T | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotAcceptableException({ message: 'Invalid ID' });
    }

    const projection = this.projection(options.hideKeysFromReturn);
    return this.repository.findById(id, projection).exec();
  }

  /**
   * Creates a new entity of type T.
   * @param item - The entity data to be created.
   * @returns A promise that resolves to the created entity of type T.
   */
  async create(item: Partial<T>): Promise<T> {
    return this.repository.create(item);
  }

  /**
   * Updates an entity of type T by its unique identifier.
   * @param id - The unique identifier of the entity to be updated.
   * @param item - The updated entity data.
   * @returns A promise that resolves to the updated entity of type T.
   */
  async update(
    id: string,
    item: Partial<T>,
    options: OptionsForFind,
  ): Promise<T | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotAcceptableException({ message: 'Invalid ID' });
    }
    const projection = this.projection(options.hideKeysFromReturn);
    return this.repository.findByIdAndUpdate(id, item, {
      new: true,
      projection,
    });
  }

  /**
   * Deletes an entity of type T by its unique identifier.
   * @param id - The unique identifier of the entity to be deleted.
   * @returns A promise that resolves to the deleted entity of type T.
   */
  async delete(id: string): Promise<T | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotAcceptableException({ message: 'Invalid ID' });
    }
    return this.repository.findByIdAndDelete(id);
  }

  // delete all
  async deleteAll(): Promise<any> {
    return this.repository.deleteMany({});
  }

  /**
   * Retrieves entities of type T based on specific IDs.
   * @param ids - An array of unique identifiers for entities.
   * @returns A promise that resolves to an array of entities of type T.
   */
  // async findByIds(ids: Types.ObjectId[]): Promise<T[]> {
  //   return this.repository
  //     .find({ _id: { $in: ids } })
  //     .populate(this.populateOnFind)
  //     .exec();
  // }

  /**
   * Counts the total number of entities that match the provided criteria.
   * @param criteria - The criteria to match entities for counting.
   * @returns A promise that resolves to the total count of entities.
   */
  async count(): Promise<number> {
    return this.repository.estimatedDocumentCount().exec();
  }

  /**
   * Searches for entities of type T based on the provided search query.
   * @param query - The search query to find entities in specific fields (e.g., title or description).
   * @returns A promise that resolves to an array of entities of type T matching the search query.
   */
  async search(query: string): Promise<T[]> {
    return this.repository
      .find({
        $or: [
          { title: { $regex: query, $options: 'i' } }, // Case-insensitive regex search on title
          { description: { $regex: query, $options: 'i' } }, // Case-insensitive regex search on description
          // Add more fields for search as needed
        ],
      })
      .populate(this.populateOnFind)
      .exec();
  }
}
