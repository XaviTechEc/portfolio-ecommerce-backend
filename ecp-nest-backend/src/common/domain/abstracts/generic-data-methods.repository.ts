import { IGenericArgs } from '../dtos/graphql/args/generic-args.repository';
import { GetAllGenericResponse } from '../interfaces/responses/get-all-generic-response.interface';

export abstract class IGenericDataMethodsRepository<T> {
  abstract getAll(args?: IGenericArgs<T>): Promise<GetAllGenericResponse<T>>;
  abstract create(data: T): Promise<T>;
  abstract getOneById(id: string): Promise<T>;
  abstract updateOneById(id: string, data: T): Promise<T>;
  abstract deleteOneById(id: string): Promise<T>;
}
