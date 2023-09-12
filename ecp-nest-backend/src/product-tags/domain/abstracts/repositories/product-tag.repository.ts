import {
  IGenericArgs,
  PaginationArgs,
} from 'src/common/domain/dtos/graphql/args';
import {
  CreateProductTagInput,
  UpdateProductTagInput,
} from '../../dtos/graphql/inputs/product-tag.input';

export abstract class IProductTagRepository<T> {
  abstract getAllProductTag(args?: IGenericArgs<T>): Promise<T[]>;
  abstract getProductTagById(id: string): Promise<T>;
  abstract createProductTag(
    createProductTagInput: CreateProductTagInput,
  ): Promise<T>;
  abstract updateProductTag(
    id: string,
    updateProductTagInput: UpdateProductTagInput,
  ): Promise<T>;
  abstract removeProductTag(id: string): Promise<T>;
  abstract getProductTagsBy(
    term: string,
    fields: (keyof T)[],
    paginationArgs: PaginationArgs,
  ): Promise<T[]>;
}
