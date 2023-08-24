import { ICategory } from 'src/core/entities';

export abstract class ICategoriesRepository {
  abstract getAllCategories(): Promise<ICategory[]>;
  abstract getAllCategoriesBy(fields: Partial<ICategory>): Promise<ICategory[]>;
  abstract getCategoryById(id: string): Promise<ICategory>;
  abstract getOneCategoryBy(fields: Partial<ICategory>): Promise<ICategory>;
  abstract createCategory(createCategoryInput: any): Promise<ICategory>;
  abstract updateCategory(updateCategoryInput: any): Promise<ICategory>;
  abstract removeCategory(id: string): Promise<ICategory>;
}
