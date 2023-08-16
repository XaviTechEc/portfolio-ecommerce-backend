export abstract class IAuthGenericRepository<T> {
  abstract getAll(): Promise<T[]>;
  abstract getOneById(id: string): Promise<T>;
  abstract create(data: T): Promise<T>;
  abstract updateById(id: string, data: T): Promise<T>;
}
