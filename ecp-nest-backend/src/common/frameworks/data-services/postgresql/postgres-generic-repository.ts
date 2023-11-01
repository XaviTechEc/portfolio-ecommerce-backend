import { IGenericDataMethodsRepository } from 'src/common/domain/abstracts/generic-data-methods.repository';
import { IGenericArgs } from 'src/common/domain/dtos/graphql/args';
import { GetAllGenericResponse } from 'src/common/domain/interfaces/responses/get-all-generic-response.interface';
import { Repository } from 'typeorm';

export class PostgresGenericRepository<T>
  implements IGenericDataMethodsRepository<T>
{
  private _repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this._repository = repository;
  }
  async getAll(args?: IGenericArgs<T>): Promise<GetAllGenericResponse<T>> {
    const [items, total] = await this._repository.findAndCount();
    return { items, total };
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
