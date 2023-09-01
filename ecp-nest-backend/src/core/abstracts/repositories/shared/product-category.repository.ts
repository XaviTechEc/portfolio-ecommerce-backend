import {
  CreateProductCategoryInput,
  IGenericArgs,
  UpdateProductCategoryInput,
} from 'src/core/dtos';

export abstract class IProductCategoryRepository<T> {
  abstract getAllProductCategory(args?: IGenericArgs<T>): Promise<T[]>;
  abstract getOneProductCategoryById(id: string): Promise<T>;
  abstract createProductCategory(
    createProductCategoryInput: CreateProductCategoryInput,
  ): Promise<T>;
  abstract updateOneProductCategoryById(
    id: string,
    updateProductCategoryInput: UpdateProductCategoryInput,
  ): Promise<T>;
  abstract deleteOneProductCategoryById(id: string): Promise<T>;
}
