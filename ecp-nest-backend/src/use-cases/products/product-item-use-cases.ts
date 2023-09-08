import { Injectable } from '@nestjs/common';
import { IProductItemsRepository } from 'src/core/abstracts/repositories';
import { IDataSourcesService } from 'src/core/abstracts/services/data-services/data-sources.service';
import { ProductItemFactoryService } from './factory/product-item-factory.service';
import {
  CreateProductItemInput,
  PaginationArgs,
  UpdateProductItemInput,
} from 'src/core/dtos';
import { IProductItem } from 'src/core/entities';
import { IGenericArgs } from 'src/core/dtos/graphql/args/generic-args.repository';

@Injectable()
export class ProductItemUseCases
  implements IProductItemsRepository<IProductItem>
{
  constructor(
    private dataService: IDataSourcesService,
    private productItemFactoryService: ProductItemFactoryService,
  ) {}
  getProductItemsBy(
    term: string,
    fields: (keyof IProductItem)[],
    paginationArgs: PaginationArgs,
  ): Promise<IProductItem[]> {
    return this.dataService.productItems.getProductItemsBy(
      term,
      fields,
      paginationArgs,
    );
  }
  getAllProductItems(
    args?: IGenericArgs<IProductItem>,
  ): Promise<IProductItem[]> {
    return this.dataService.productItems.getAllProductItems(args);
  }

  getProductItemById(id: string): Promise<IProductItem> {
    return this.dataService.productItems.getProductItemById(id);
  }

  createProductItem(
    createProductItemInput: CreateProductItemInput,
  ): Promise<IProductItem> {
    const productItem = this.productItemFactoryService.createProductItem(
      createProductItemInput,
    );
    return this.dataService.productItems.createProductItem(productItem);
  }
  updateProductItem(
    id: string,
    updateProductItemInput: UpdateProductItemInput,
  ): Promise<IProductItem> {
    const productItem = this.productItemFactoryService.updateProductItem(
      updateProductItemInput,
    );

    return this.dataService.productItems.updateProductItem(id, productItem);
  }
  removeProductItem(id: string): Promise<IProductItem> {
    return this.dataService.productItems.removeProductItem(id);
  }
}
