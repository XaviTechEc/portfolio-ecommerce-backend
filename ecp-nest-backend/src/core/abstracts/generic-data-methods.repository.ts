import { PaginationArgs } from 'src/common/graphql/args';
import { SearchArgs } from '../../common/graphql/args/search.args';

export abstract class IGenericArgs<T> {
  paginationArgs?: PaginationArgs;
  searchArgs?: SearchArgs<T>;
}

export abstract class IGenericDataMethodsRepository<T> {
  abstract getAll(args?: IGenericArgs<T>): Promise<T[]>;
  abstract getAllBy(
    fields: Partial<T> | Partial<T>[],
    args?: IGenericArgs<T>,
  ): Promise<T[]>;
  abstract getOneBy(
    fields: Partial<T> | Partial<T>[],
    args?: IGenericArgs<T>,
  ): Promise<T>;
  abstract create(data: T): Promise<T>;
  abstract getOneById(id: string): Promise<T>;
  abstract updateOneById(id: string, data: T): Promise<T>;
  abstract deleteOneById(id: string): Promise<T>;
}
