import { IGenericArgs } from 'src/core/dtos/graphql/args/generic-args.repository';
import { IProductItemsRepository } from 'src/core/abstracts/repositories';
import { CreateProductItemInput, UpdateProductItemInput } from 'src/core/dtos';
import { Repository } from 'typeorm';
import { ProductItem } from '../../entities/outputs/entities';

export class ProductItemsRepository
  implements IProductItemsRepository<ProductItem>
{
  private _repository: Repository<ProductItem>;

  constructor(repository: Repository<ProductItem>) {
    this._repository = repository;
  }
  getAllProductItems(args?: IGenericArgs<ProductItem>): Promise<ProductItem[]> {
    throw new Error('Method not implemented.');
  }
  getAllProductItemsBy(
    fields: Partial<ProductItem>,
    args?: IGenericArgs<ProductItem>,
  ): Promise<ProductItem[]> {
    throw new Error('Method not implemented.');
  }
  getProductItemById(id: string): Promise<ProductItem> {
    throw new Error('Method not implemented.');
  }
  getOneProductItemBy(
    fields: Partial<ProductItem>,
    args?: IGenericArgs<ProductItem>,
  ): Promise<ProductItem> {
    throw new Error('Method not implemented.');
  }
  createProductItem(
    createProductItemInput: CreateProductItemInput,
  ): Promise<ProductItem> {
    throw new Error('Method not implemented.');
  }
  updateProductItem(
    id: string,
    updateProductItemInput: UpdateProductItemInput,
  ): Promise<ProductItem> {
    throw new Error('Method not implemented.');
  }
  removeProductItem(id: string): Promise<ProductItem> {
    throw new Error('Method not implemented.');
  }
}
