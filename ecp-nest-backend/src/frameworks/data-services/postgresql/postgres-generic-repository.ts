import {
  IGenericArgs,
  IGenericDataMethodsRepository,
} from 'src/core/abstracts/generic-data-methods.repository';
import { Repository } from 'typeorm';

export class PostgresGenericRepository<T>
  implements IGenericDataMethodsRepository<T>
{
  private _repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this._repository = repository;
  }
  async getAll(args?: IGenericArgs<T>): Promise<T[]> {
    const { paginationArgs, searchArgs } = args;
    let query = this._repository.createQueryBuilder();
    if (paginationArgs) {
      const { limit = 10, offset = 0 } = paginationArgs;
      query = query.skip(offset).limit(limit);
    }
    if (searchArgs) {
    }

    return await query.getMany();
  }

  getAllBy(
    fields: Partial<T> | Partial<T>[],
    args?: IGenericArgs<T>,
  ): Promise<T[]> {
    throw new Error('Method not implemented.');
  }

  getOneBy(
    fields: Partial<T> | Partial<T>[],
    args?: IGenericArgs<T>,
  ): Promise<T> {
    throw new Error('Method not implemented.');
  }

  async create(data: T): Promise<T> {
    return this._repository.save({ ...data });
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
