import { Injectable } from '@nestjs/common';
import {
  IGenericArgs,
  PaginationArgs,
} from 'src/common/domain/dtos/graphql/args';
import { IProductsDataSourceService } from 'src/products/domain/abstracts/services/products-datasource.abstract.service';
import {
  CreateProductInput,
  UpdateProductInput,
} from 'src/products/domain/dtos/graphql/inputs/product.input';
import { IProduct } from 'src/products/domain/entities/product.entity';
import { ProductFactoryService } from './factory/product-factory.service';

@Injectable()
export class ProductUseCases {
  constructor(
    private dataService: IProductsDataSourceService,
    private productFactoryService: ProductFactoryService,
  ) {}
  getProductsBy(
    term: string,
    fields: (keyof IProduct)[],
    paginationArgs: PaginationArgs,
  ) {
    return this.dataService.products.getProductsBy(
      term,
      fields,
      paginationArgs,
    );
  }
  getAllProducts(args?: IGenericArgs<IProduct>) {
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
