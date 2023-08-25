import { Injectable } from '@nestjs/common';
import { IProductsRepository } from 'src/core/abstracts/repositories';
import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
import { ProductFactoryService } from './factory';
import { CreateProductInput, UpdateProductInput } from 'src/core/dtos';
import { IProduct } from 'src/core/entities';

@Injectable()
export class ProductUseCases implements IProductsRepository {
  constructor(
    private dataService: IDataSourcesService,
    private productFactoryService: ProductFactoryService,
  ) {}
  getAllProducts(): Promise<IProduct[]> {
    return this.dataService.products.getAll();
  }
  getAllProductsBy(fields: Partial<IProduct>): Promise<IProduct[]> {
    return this.dataService.products.getAllBy(fields);
  }
  getProductById(id: string): Promise<IProduct> {
    return this.dataService.products.getOneById(id);
  }
  getOneProductBy(fields: Partial<IProduct>): Promise<IProduct> {
    return this.dataService.products.getOneBy(fields);
  }
  createProduct(createProductInput: CreateProductInput): Promise<IProduct> {
    const product =
      this.productFactoryService.createProduct(createProductInput);
    return this.dataService.products.create(product);
  }
  updateProduct(
    id: string,
    updateProductInput: UpdateProductInput,
  ): Promise<IProduct> {
    const product =
      this.productFactoryService.updateProduct(updateProductInput);
    return this.dataService.products.updateOneById(id, product);
  }
  removeProduct(id: string): Promise<IProduct> {
    return this.dataService.products.deleteOneById(id);
  }
}
