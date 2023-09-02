import { IProductCategoryRepository } from 'src/core/abstracts/repositories';
import { Repository } from 'typeorm';
import { ProductCategory } from '../../entities/outputs/entities';
import {
  IGenericArgs,
  CreateProductCategoryInput,
  UpdateProductCategoryInput,
} from 'src/core/dtos';

export class ProductCategoriesRepository
  implements IProductCategoryRepository<ProductCategory>
{
  private _repository: Repository<ProductCategory>;

  constructor(repository: Repository<ProductCategory>) {
    this._repository = repository;
  }
  getAllProductCategory(
    args?: IGenericArgs<ProductCategory>,
  ): Promise<ProductCategory[]> {
    throw new Error('Method not implemented.');
  }
  getProductCategoryById(id: string): Promise<ProductCategory> {
    throw new Error('Method not implemented.');
  }
  createProductCategory(
    createProductCategoryInput: CreateProductCategoryInput,
  ): Promise<ProductCategory> {
    throw new Error('Method not implemented.');
  }
  updateProductCategory(
    id: string,
    updateProductCategoryInput: UpdateProductCategoryInput,
  ): Promise<ProductCategory> {
    throw new Error('Method not implemented.');
  }
  removeProductCategory(id: string): Promise<ProductCategory> {
    throw new Error('Method not implemented.');
  }
}
