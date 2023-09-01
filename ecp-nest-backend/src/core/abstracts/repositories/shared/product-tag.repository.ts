import {
  CreateProductTagInput,
  IGenericArgs,
  UpdateProductTagInput,
} from 'src/core/dtos';

export abstract class IProductTagRepository<T> {
  abstract getAllProductTag(args?: IGenericArgs<T>): Promise<T[]>;
  abstract createProductTag(
    createProductTagInput: CreateProductTagInput,
  ): Promise<T>;
  abstract getOneProductTagById(id: string): Promise<T>;
  abstract updateOneProductTagById(
    updateProductTagInput: UpdateProductTagInput,
  ): Promise<T>;
  abstract deleteOneProductTagById(id: string): Promise<T>;
}
