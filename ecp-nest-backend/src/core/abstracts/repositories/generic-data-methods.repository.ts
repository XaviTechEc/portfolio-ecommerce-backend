export abstract class IGenericDataMethodsRepository<T> {
  abstract create(data: T): Promise<T>;
  abstract getAll(): Promise<T[]>;
  abstract getOneById(id: string): Promise<T>;
  abstract updateOneById(id: string, data: T): Promise<T>;
  abstract deleteOneById(id: string): Promise<T>;
}
