import { IGenericDataMethodsRepository } from 'src/core/abstracts/repositories/generic-data-methods.repository';

import { Repository } from 'typeorm';

export class PostgresGenericRepository<T>
  implements IGenericDataMethodsRepository<T>
{
  private _repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this._repository = repository;
  }

  async create(data: T): Promise<T> {
    return this._repository.save({ ...data });
  }

  async getAll(): Promise<T[]> {
    return this._repository.find();
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
}
