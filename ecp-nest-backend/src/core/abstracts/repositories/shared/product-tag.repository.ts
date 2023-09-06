import {
  CreateProductTagInput,
  IGenericArgs,
  PaginationArgs,
  UpdateProductTagInput,
} from 'src/core/dtos';

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
