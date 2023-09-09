import { IGenericArgs } from '../dtos/graphql/args/generic-args.repository';

export abstract class IGenericDataMethodsRepository<T> {
  abstract getAll(args?: IGenericArgs<T>): Promise<T[]>;
  abstract create(data: T): Promise<T>;
  abstract getOneById(id: string): Promise<T>;
  abstract updateOneById(id: string, data: T): Promise<T>;
  abstract deleteOneById(id: string): Promise<T>;
}
