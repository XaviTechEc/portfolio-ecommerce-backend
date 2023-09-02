import { IProductTagRepository } from 'src/core/abstracts/repositories';
import { Repository } from 'typeorm';
import { ProductTag } from '../../entities/outputs/entities';
import {
  IGenericArgs,
  CreateProductTagInput,
  UpdateProductTagInput,
} from 'src/core/dtos';

export class ProductTagsRepository
  implements IProductTagRepository<ProductTag>
{
  private _repository: Repository<ProductTag>;

  constructor(repository: Repository<ProductTag>) {
    this._repository = repository;
  }
  getAllProductTag(args?: IGenericArgs<ProductTag>): Promise<ProductTag[]> {
    throw new Error('Method not implemented.');
  }
  getProductTagById(id: string): Promise<ProductTag> {
    throw new Error('Method not implemented.');
  }
  createProductTag(
    createProductTagInput: CreateProductTagInput,
  ): Promise<ProductTag> {
    throw new Error('Method not implemented.');
  }
  updateProductTag(
    id: string,
    updateProductTagInput: UpdateProductTagInput,
  ): Promise<ProductTag> {
    throw new Error('Method not implemented.');
  }
  removeProductTag(id: string): Promise<ProductTag> {
    throw new Error('Method not implemented.');
  }
}
