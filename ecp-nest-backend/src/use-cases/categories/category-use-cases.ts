import { Injectable } from '@nestjs/common';
import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
import { CategoryFactoryService } from './category-factory.service';
import { ICategoriesRepository } from 'src/core/abstracts/repositories';
import {
  CreateCategoryInput,
  PaginationArgs,
  UpdateCategoryInput,
} from 'src/core/dtos';
import { ICategory } from 'src/core/entities';
import { IGenericArgs } from 'src/core/dtos/graphql/args/generic-args.repository';

@Injectable()
export class CategoryUseCases implements ICategoriesRepository<ICategory> {
  constructor(
    private dataService: IDataSourcesService,
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
