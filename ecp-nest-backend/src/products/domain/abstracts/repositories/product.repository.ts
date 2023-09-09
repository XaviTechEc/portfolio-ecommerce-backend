import { CreateProductInput, UpdateProductInput } from 'src/core/dtos';
import { IGenericArgs } from '../../../dtos/graphql/args/generic-args.repository';
import { PaginationArgs } from '../../../dtos/graphql/args/pagination.args';

export abstract class IProductsRepository<T> {
  abstract getAllProducts(args?: IGenericArgs<T>): Promise<T[]>;

  abstract getProductById(id: string): Promise<T>;
  abstract createProduct(createProductInput: CreateProductInput): Promise<T>;
  abstract updateProduct(
    id: string,
    updateProductInput: UpdateProductInput,
  ): Promise<T>;
  abstract removeProduct(id: string): Promise<T>;

  abstract getProductsBy(
    term: string,
    fields: (keyof T)[],
    paginationArgs: PaginationArgs,
  ): Promise<T[]>;
}
