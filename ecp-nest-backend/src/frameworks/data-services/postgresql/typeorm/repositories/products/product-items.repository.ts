import { IGenericArgs } from 'src/core/dtos/graphql/args/generic-args.repository';
import { IProductItemsRepository } from 'src/core/abstracts/repositories';
import { CreateProductItemInput, UpdateProductItemInput } from 'src/core/dtos';
import { Repository } from 'typeorm';

export class ProductItemsRepository<T> implements IProductItemsRepository<T> {
  private _repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this._repository = repository;
  }
  getAllProductItems(args?: IGenericArgs<T>): Promise<T[]> {
    throw new Error('Method not implemented.');
  }
  getAllProductItemsBy(
    fields: Partial<T>,
    args?: IGenericArgs<T>,
  ): Promise<T[]> {
    throw new Error('Method not implemented.');
  }
  getProductItemById(id: string): Promise<T> {
    throw new Error('Method not implemented.');
  }
  getOneProductItemBy(fields: Partial<T>, args?: IGenericArgs<T>): Promise<T> {
    throw new Error('Method not implemented.');
  }
  createProductItem(
    createProductItemInput: CreateProductItemInput,
  ): Promise<T> {
    throw new Error('Method not implemented.');
  }
  updateProductItem(
    id: string,
    updateProductItemInput: UpdateProductItemInput,
  ): Promise<T> {
    throw new Error('Method not implemented.');
  }
  removeProductItem(id: string): Promise<T> {
    throw new Error('Method not implemented.');
  }
}
