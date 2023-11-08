export abstract class IRepository<T> {
  abstract create(dto: T): Promise<T>;
  abstract update(id: number, dto: T): Promise<T>;
  abstract delete(id: number): Promise<T>;
  abstract findAll(): Promise<T[]>;
  abstract findOne(id: number): Promise<T>;
}
