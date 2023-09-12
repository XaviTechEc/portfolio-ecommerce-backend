import { Injectable } from '@nestjs/common';
import { ICategoriesRepository } from 'src/categories/domain/abstracts/repositories/categories.repository';
import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from 'src/categories/domain/dtos/graphql/inputs/category.input';
import { ICategory } from 'src/categories/domain/entities/category.entity';
import {
  PaginationArgs,
  IGenericArgs,
} from 'src/common/domain/dtos/graphql/args';
import { CategoryFactoryService } from './factory/category-factory.service';
import { ICategoryDataSourceService } from 'src/categories/domain/abstracts/services/category-datasource.abstract.service';

@Injectable()
export class CategoryUseCases implements ICategoriesRepository<ICategory> {
  constructor(
    private dataService: ICategoryDataSourceService,
    private categoryFactoryService: CategoryFactoryService,
  ) {}
  getCategoriesBy(
    term: string,
    fields: (keyof ICategory)[],
    paginationArgs: PaginationArgs,
  ): Promise<ICategory[]> {
    return this.dataService.categories.getCategoriesBy(
      term,
      fields,
      paginationArgs,
    );
  }
  getAllCategories(args?: IGenericArgs<ICategory>): Promise<ICategory[]> {
    return this.dataService.categories.getAllCategories(args);
  }

  getCategoryById(id: string): Promise<ICategory> {
    return this.dataService.categories.getCategoryById(id);
  }
  createCategory(createCategoryInput: CreateCategoryInput): Promise<ICategory> {
    const category =
      this.categoryFactoryService.createCategory(createCategoryInput);
    return this.dataService.categories.createCategory(category);
  }
  updateCategory(
    id: string,
    updateCategoryInput: UpdateCategoryInput,
  ): Promise<ICategory> {
    const category =
      this.categoryFactoryService.updateCategory(updateCategoryInput);
    return this.dataService.categories.updateCategory(id, category);
  }
  removeCategory(id: string): Promise<ICategory> {
    return this.dataService.categories.removeCategory(id);
  }
}
