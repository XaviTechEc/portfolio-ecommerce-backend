export abstract class IGenericOptions {
  find: unknown;
  findOne: unknown;
  findBy: unknown;
}

export abstract class IGenericDataMethodsRepository<
  T,
  K extends IGenericOptions,
> {
  abstract create(data: T): Promise<T>;
  abstract getAll(options?: Pick<K, 'find'>['find']): Promise<T[]>;
  abstract getAllBy(
    fields: Partial<T> | Partial<T>[],
    options?: Pick<K, 'find'>['find'],
  ): Promise<T[]>;
  abstract getOneById(id: string): Promise<T>;
  abstract getOneBy(
    fields: Partial<T> | Partial<T>[],
    options?: Pick<K, 'findOne'>['findOne'],
  ): Promise<T>;
  abstract updateOneById(id: string, data: T): Promise<T>;
  abstract deleteOneById(id: string): Promise<T>;
}
