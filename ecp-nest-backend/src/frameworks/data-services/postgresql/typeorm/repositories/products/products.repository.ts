import { IGenericArgs } from 'src/core/dtos/graphql/args/generic-args.repository';
import { IProductsRepository } from 'src/core/abstracts/repositories';
import { CreateProductInput, UpdateProductInput } from 'src/core/dtos';
import { Repository } from 'typeorm';
import { Product } from '../../entities/outputs/entities';

export class ProductsRepository implements IProductsRepository<Product> {
  private _repository: Repository<Product>;

  constructor(repository: Repository<Product>) {
    this._repository = repository;
  }
  getAllProducts(args?: IGenericArgs<Product>): Promise<Product[]> {
    throw new Error('Method not implemented.');
  }
  getAllProductsBy(
    fields: Partial<Product>,
    args?: IGenericArgs<Product>,
  ): Promise<Product[]> {
    throw new Error('Method not implemented.');
  }
  getOneProductBy(
    fields: Partial<Product>,
    args?: IGenericArgs<Product>,
  ): Promise<Product> {
    throw new Error('Method not implemented.');
  }
  getProductById(id: string): Promise<Product> {
    throw new Error('Method not implemented.');
  }
  createProduct(createProductInput: CreateProductInput): Promise<Product> {
    throw new Error('Method not implemented.');
  }
  updateProduct(
    id: string,
    updateProductInput: UpdateProductInput,
  ): Promise<Product> {
    throw new Error('Method not implemented.');
  }
  removeProduct(id: string): Promise<Product> {
    throw new Error('Method not implemented.');
  }
}
