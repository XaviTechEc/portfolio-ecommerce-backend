import { Injectable } from '@nestjs/common';
import { IProductsRepository } from 'src/core/abstracts/repositories';
import { IDataSourcesService } from 'src/core/abstracts/services/data-services/data-sources.service';
import { ProductFactoryService } from './factory';
import {
  CreateProductInput,
  PaginationArgs,
  UpdateProductInput,
} from 'src/core/dtos';
import { IProduct } from 'src/core/entities';
import { IGenericArgs } from 'src/core/dtos/graphql/args/generic-args.repository';

@Injectable()
export class ProductUseCases implements IProductsRepository<IProduct> {
  constructor(
    private dataService: IDataSourcesService,
    private productFactoryService: ProductFactoryService,
  ) {}
  getProductsBy(
    term: string,
    fields: (keyof IProduct)[],
    paginationArgs: PaginationArgs,
  ): Promise<IProduct[]> {
    return this.dataService.products.getProductsBy(
      term,
      fields,
      paginationArgs,
    );
  }
  getAllProducts(args?: IGenericArgs<IProduct>): Promise<IProduct[]> {
    return this.dataService.products.getAllProducts(args);
  }

  getProductById(id: string): Promise<IProduct> {
    return this.dataService.products.getProductById(id);
  }
  createProduct(createProductInput: CreateProductInput): Promise<IProduct> {
    const product =
      this.productFactoryService.createProduct(createProductInput);
    return this.dataService.products.createProduct(product);
  }
  updateProduct(
    id: string,
    updateProductInput: UpdateProductInput,
  ): Promise<IProduct> {
    const product =
      this.productFactoryService.updateProduct(updateProductInput);
    return this.dataService.products.updateProduct(id, product);
  }
  removeProduct(id: string): Promise<IProduct> {
    return this.dataService.products.removeProduct(id);
  }
}
