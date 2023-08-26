import { IGenericDataMethodsRepository } from 'src/core/abstracts/repositories/shared/generic-data-methods.repository';

import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

export interface PostgresGenericOptionsFor<K> {
  find: FindManyOptions<K>;
  findBy: FindOptionsWhere<K> | FindOptionsWhere<K>[];
  findOne: FindOneOptions<K>;
}

export class PostgresGenericRepository<T>
  implements IGenericDataMethodsRepository<T, PostgresGenericOptionsFor<T>>
{
  private _repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this._repository = repository;
  }

  async getAll(options?: FindManyOptions<T>): Promise<T[]> {
    return this._repository.find({ ...options });
  }

  async create(data: T): Promise<T> {
    return this._repository.save({ ...data });
  }

  getAllBy(
    fields: Partial<T> | Partial<T>[],
    options?: FindManyOptions<T>,
  ): Promise<T[]> {
    const where = this._checkFields(fields);
    return this._repository.find({
      ...options,
      where,
    });
  }

  getOneBy(
    fields: Partial<T> | Partial<T>[],
    options?: FindOneOptions<T>,
  ): Promise<T> {
    const where = this._checkFields(fields);
    return this._repository.findOne({
      ...options,
      where,
    });
  }

  async getOneById(id: any): Promise<T> {
    return this._repository.findOneBy(id);
  }

  async updateOneById(id: any, data: T): Promise<T> {
    return this._repository.preload({ id, ...data });
  }

  async deleteOneById(id: any): Promise<T> {
    const item = await this._repository.findOne(id);
    await this._repository.remove(item);
    return item;
  }

  // Private Methods
  private _checkFields(fields: Partial<T> | Partial<T>[]) {
    const isArray = Array.isArray(fields);
    const whereOption = isArray
      ? ([...fields] as FindOptionsWhere<T>[])
      : ({ ...fields } as FindOptionsWhere<T>);
    return whereOption;
  }
}
