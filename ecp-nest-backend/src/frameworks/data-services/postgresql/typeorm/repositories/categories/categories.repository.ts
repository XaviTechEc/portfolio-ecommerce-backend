import { IGenericArgs } from 'src/core/dtos/graphql/args/generic-args.repository';
import { ICategoriesRepository } from 'src/core/abstracts/repositories';
import { CreateCategoryInput, UpdateCategoryInput } from 'src/core/dtos';
import { Repository } from 'typeorm';
import { Category } from '../../entities/outputs/entities';

export class CategoriesRepository implements ICategoriesRepository<Category> {
  private _repository: Repository<Category>;

  constructor(repository: Repository<Category>) {
    this._repository = repository;
  }
  getAllCategories(args?: IGenericArgs<Category>): Promise<Category[]> {
    throw new Error('Method not implemented.');
  }
  getAllCategoriesBy(
    fields: Partial<Category>,
    args?: IGenericArgs<Category>,
  ): Promise<Category[]> {
    throw new Error('Method not implemented.');
  }
  getOneCategoryBy(
    fields: Partial<Category>,
    args?: IGenericArgs<Category>,
  ): Promise<Category> {
    throw new Error('Method not implemented.');
  }
  getCategoryById(id: string): Promise<Category> {
    throw new Error('Method not implemented.');
  }
  createCategory(createCategoryInput: CreateCategoryInput): Promise<Category> {
    throw new Error('Method not implemented.');
  }
  updateCategory(
    id: string,
    updateCategoryInput: UpdateCategoryInput,
  ): Promise<Category> {
    throw new Error('Method not implemented.');
  }
  removeCategory(id: string): Promise<Category> {
    throw new Error('Method not implemented.');
  }
}
