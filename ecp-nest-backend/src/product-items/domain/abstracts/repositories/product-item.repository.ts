import {
  IGenericArgs,
  PaginationArgs,
} from 'src/common/domain/dtos/graphql/args';
import {
  CreateProductItemInput,
  UpdateProductItemInput,
} from '../../dtos/graphql/inputs/product-item.input';

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
