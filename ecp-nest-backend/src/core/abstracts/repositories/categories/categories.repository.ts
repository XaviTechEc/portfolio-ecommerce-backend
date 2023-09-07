import {
  IGenericArgs,
  CreateCategoryInput,
  UpdateCategoryInput,
  PaginationArgs,
} from 'src/core/dtos';

export abstract class ICategoriesRepository<T> {
  abstract getAllCategories(args?: IGenericArgs<T>): Promise<T[]>;
  abstract getCategoryById(id: string): Promise<T>;
  abstract createCategory(createCategoryInput: CreateCategoryInput): Promise<T>;
  abstract updateCategory(
    id: string,
    updateCategoryInput: UpdateCategoryInput,
  ): Promise<T>;
  abstract removeCategory(id: string): Promise<T>;

  abstract getCategoriesBy(
    term: string,
    fields: (keyof T)[],
    paginationArgs: PaginationArgs,
  ): Promise<T[]>;
}
