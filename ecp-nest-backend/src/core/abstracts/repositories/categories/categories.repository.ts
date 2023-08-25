import { CreateCategoryInput, UpdateCategoryInput } from 'src/core/dtos';
import { ICategory } from 'src/core/entities';

export abstract class ICategoriesRepository {
  abstract getAllCategories(): Promise<ICategory[]>;
  abstract getAllCategoriesBy(fields: Partial<ICategory>): Promise<ICategory[]>;
  abstract getCategoryById(id: string): Promise<ICategory>;
  abstract getOneCategoryBy(fields: Partial<ICategory>): Promise<ICategory>;
  abstract createCategory(
    createCategoryInput: CreateCategoryInput,
  ): Promise<ICategory>;
  abstract updateCategory(
    id: string,
    updateCategoryInput: UpdateCategoryInput,
  ): Promise<ICategory>;
  abstract removeCategory(id: string): Promise<ICategory>;
}
