import {
  IGenericArgs,
  PaginationArgs,
} from 'src/common/domain/dtos/graphql/args';
import {
  CreateProductCategoryInput,
  UpdateProductCategoryInput,
} from '../../dtos/graphql/inputs/product-category.input';

export abstract class IProductCategoryRepository<T> {
  abstract getAllProductCategory(args?: IGenericArgs<T>): Promise<T[]>;
  abstract getProductCategoryById(id: string): Promise<T>;
  abstract createProductCategory(
    createProductCategoryInput: CreateProductCategoryInput,
  ): Promise<T>;
  abstract updateProductCategory(
    id: string,
    updateProductCategoryInput: UpdateProductCategoryInput,
  ): Promise<T>;
  abstract removeProductCategory(id: string): Promise<T>;
  abstract getProductCategoriesBy(
    term: string,
    fields: (keyof T)[],
    paginationArgs: PaginationArgs,
  ): Promise<T[]>;
}
