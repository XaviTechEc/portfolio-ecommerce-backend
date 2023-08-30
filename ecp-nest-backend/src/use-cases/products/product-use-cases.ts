import { Injectable } from '@nestjs/common';
import { IProductsRepository } from 'src/core/abstracts/repositories';
import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
import { ProductFactoryService } from './factory';
import { CreateProductInput, UpdateProductInput } from 'src/core/dtos';
import { IProduct } from 'src/core/entities';
import { IGenericArgs } from 'src/core/abstracts/generic-args.repository';

@Injectable()
export class ProductUseCases implements IProductsRepository<IProduct> {
  constructor(
    private dataService: IDataSourcesService,
    private productFactoryService: ProductFactoryService,
  ) {}
  getAllProducts(args?: IGenericArgs<IProduct>): Promise<IProduct[]> {
    throw new Error('Method not implemented.');
  }
  getAllProductsBy(
    fields: Partial<IProduct>,
    args?: IGenericArgs<IProduct>,
  ): Promise<IProduct[]> {
    throw new Error('Method not implemented.');
  }
  getOneProductBy(
    fields: Partial<IProduct>,
    args?: IGenericArgs<IProduct>,
  ): Promise<IProduct> {
    throw new Error('Method not implemented.');
  }
  getProductById(id: string): Promise<IProduct> {
    throw new Error('Method not implemented.');
  }
  createProduct(createProductInput: CreateProductInput): Promise<IProduct> {
    throw new Error('Method not implemented.');
  }
  updateProduct(
    id: string,
    updateProductInput: UpdateProductInput,
  ): Promise<IProduct> {
    throw new Error('Method not implemented.');
  }
  removeProduct(id: string): Promise<IProduct> {
    throw new Error('Method not implemented.');
  }
}
