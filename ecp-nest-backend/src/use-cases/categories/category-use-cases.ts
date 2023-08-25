import { Injectable } from '@nestjs/common';
import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
import { CategoryFactoryService } from './category-factory.service';
import { ICategoriesRepository } from 'src/core/abstracts/repositories';
import { CreateCategoryInput, UpdateCategoryInput } from 'src/core/dtos';
import { ICategory } from 'src/core/entities';

@Injectable()
export class CategoryUseCases implements ICategoriesRepository {
  constructor(
    private dataService: IDataSourcesService,
    private categoryFactoryService: CategoryFactoryService,
  ) {}
  getAllCategories(): Promise<ICategory[]> {
    return this.dataService.categories.getAll();
  }
  getAllCategoriesBy(fields: Partial<ICategory>): Promise<ICategory[]> {
    return this.dataService.categories.getAllBy(fields);
  }
  getCategoryById(id: string): Promise<ICategory> {
    return this.dataService.categories.getOneById(id);
  }
  getOneCategoryBy(fields: Partial<ICategory>): Promise<ICategory> {
    return this.dataService.categories.getOneBy(fields);
  }
  createCategory(createCategoryInput: CreateCategoryInput): Promise<ICategory> {
    const category =
      this.categoryFactoryService.createCategory(createCategoryInput);
    return this.dataService.categories.create(category);
  }
  updateCategory(
    id: string,
    updateCategoryInput: UpdateCategoryInput,
  ): Promise<ICategory> {
    const category =
      this.categoryFactoryService.updateCategory(updateCategoryInput);
    return this.dataService.categories.updateOneById(id, category);
  }
  removeCategory(id: string): Promise<ICategory> {
    return this.dataService.categories.deleteOneById(id);
  }
}
