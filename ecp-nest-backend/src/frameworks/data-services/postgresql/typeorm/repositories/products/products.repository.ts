import { IGenericArgs } from 'src/core/abstracts/generic-args.repository';
import { IProductsRepository } from 'src/core/abstracts/repositories';
import { CreateProductInput, UpdateProductInput } from 'src/core/dtos';
import { Repository } from 'typeorm';

export class ProductsRepository<T> implements IProductsRepository<T> {
  private _repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this._repository = repository;
  }
  getAllProducts(args?: IGenericArgs<T>): Promise<T[]> {
    throw new Error('Method not implemented.');
  }
  getAllProductsBy(fields: Partial<T>, args?: IGenericArgs<T>): Promise<T[]> {
    throw new Error('Method not implemented.');
  }
  getOneProductBy(fields: Partial<T>, args?: IGenericArgs<T>): Promise<T> {
    throw new Error('Method not implemented.');
  }
  getProductById(id: string): Promise<T> {
    throw new Error('Method not implemented.');
  }
  createProduct(createProductInput: CreateProductInput): Promise<T> {
    throw new Error('Method not implemented.');
  }
  updateProduct(
    id: string,
    updateProductInput: UpdateProductInput,
  ): Promise<T> {
    throw new Error('Method not implemented.');
  }
  removeProduct(id: string): Promise<T> {
    throw new Error('Method not implemented.');
  }
}
