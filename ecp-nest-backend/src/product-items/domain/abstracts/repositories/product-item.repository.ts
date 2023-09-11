import { CreateProductItemInput, UpdateProductItemInput } from 'src/core/dtos';
import { IGenericArgs } from '../../../dtos/graphql/args/generic-args.repository';
import { PaginationArgs } from '../../../dtos/graphql/args/pagination.args';

export abstract class IProductItemsRepository<T> {
  abstract getAllProductItems(args?: IGenericArgs<T>): Promise<T[]>;

  abstract getProductItemById(id: string): Promise<T>;

  abstract createProductItem(
    createProductItemInput: CreateProductItemInput,
  ): Promise<T>;
  abstract updateProductItem(
    id: string,
    updateProductItemInput: UpdateProductItemInput,
  ): Promise<T>;
  abstract removeProductItem(id: string): Promise<T>;

  abstract getProductItemsBy(
    term: string,
    fields: (keyof T)[],
    paginationArgs: PaginationArgs,
  ): Promise<T[]>;
}