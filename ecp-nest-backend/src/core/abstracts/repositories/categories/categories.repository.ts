import { CreateCategoryInput, UpdateCategoryInput } from 'src/core/dtos';
import { IGenericArgs } from '../../../dtos/graphql/args/generic-args.repository';

export abstract class ICategoriesRepository<T> {
  abstract getAllCategories(args?: IGenericArgs<T>): Promise<T[]>;
  abstract getCategoryById(id: string): Promise<T>;
  abstract createCategory(createCategoryInput: CreateCategoryInput): Promise<T>;
  abstract updateCategory(
    id: string,
    updateCategoryInput: UpdateCategoryInput,
  ): Promise<T>;
  abstract removeCategory(id: string): Promise<T>;
}
