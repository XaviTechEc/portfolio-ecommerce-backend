import {
  IGenericArgs,
  PaginationArgs,
} from 'src/common/domain/dtos/graphql/args';
import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from '../../dtos/graphql/inputs/category.input';
import { GetAllGenericResponse } from 'src/common/domain/interfaces/responses/get-all-generic-response.interface';

export abstract class ICategoriesRepository<T> {
  abstract getAllCategories(
    args?: IGenericArgs<T>,
  ): Promise<GetAllGenericResponse<T>>;
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
  ): Promise<GetAllGenericResponse<T>>;
}
