import { IGenericArgs } from 'src/core/abstracts/generic-args.repository';
import { ICategoriesRepository } from 'src/core/abstracts/repositories';
import { CreateCategoryInput, UpdateCategoryInput } from 'src/core/dtos';
import { Repository } from 'typeorm';

export class CategoriesRepository<T> implements ICategoriesRepository<T> {
  private _repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this._repository = repository;
  }
  getAllCategories(args?: IGenericArgs<T>): Promise<T[]> {
    throw new Error('Method not implemented.');
  }
  getAllCategoriesBy(fields: Partial<T>, args?: IGenericArgs<T>): Promise<T[]> {
    throw new Error('Method not implemented.');
  }
  getOneCategoryBy(fields: Partial<T>, args?: IGenericArgs<T>): Promise<T> {
    throw new Error('Method not implemented.');
  }
  getCategoryById(id: string): Promise<T> {
    throw new Error('Method not implemented.');
  }
  createCategory(createCategoryInput: CreateCategoryInput): Promise<T> {
    throw new Error('Method not implemented.');
  }
  updateCategory(
    id: string,
    updateCategoryInput: UpdateCategoryInput,
  ): Promise<T> {
    throw new Error('Method not implemented.');
  }
  removeCategory(id: string): Promise<T> {
    throw new Error('Method not implemented.');
  }
}
