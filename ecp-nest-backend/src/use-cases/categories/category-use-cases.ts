import { Injectable } from '@nestjs/common';
import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
import { CategoryFactoryService } from './category-factory.service';
import { ICategoriesRepository } from 'src/core/abstracts/repositories';
import { CreateCategoryInput, UpdateCategoryInput } from 'src/core/dtos';
import { ICategory } from 'src/core/entities';
import { IGenericArgs } from 'src/core/abstracts/generic-args.repository';

@Injectable()
export class CategoryUseCases implements ICategoriesRepository<ICategory> {
  constructor(
    private dataService: IDataSourcesService,
    private categoryFactoryService: CategoryFactoryService,
  ) {}
  getAllCategories(args?: IGenericArgs<ICategory>): Promise<ICategory[]> {
    throw new Error('Method not implemented.');
  }
  getAllCategoriesBy(
    fields: Partial<ICategory>,
    args?: IGenericArgs<ICategory>,
  ): Promise<ICategory[]> {
    throw new Error('Method not implemented.');
  }
  getOneCategoryBy(
    fields: Partial<ICategory>,
    args?: IGenericArgs<ICategory>,
  ): Promise<ICategory> {
    throw new Error('Method not implemented.');
  }
  getCategoryById(id: string): Promise<ICategory> {
    throw new Error('Method not implemented.');
  }
  createCategory(createCategoryInput: CreateCategoryInput): Promise<ICategory> {
    throw new Error('Method not implemented.');
  }
  updateCategory(
    id: string,
    updateCategoryInput: UpdateCategoryInput,
  ): Promise<ICategory> {
    throw new Error('Method not implemented.');
  }
  removeCategory(id: string): Promise<ICategory> {
    throw new Error('Method not implemented.');
  }
}
