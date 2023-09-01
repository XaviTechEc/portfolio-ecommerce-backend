import { Injectable } from '@nestjs/common';
import { IProductItemsRepository } from 'src/core/abstracts/repositories';
import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
import { ProductItemFactoryService } from './factory/product-item-factory.service';
import { CreateProductItemInput, UpdateProductItemInput } from 'src/core/dtos';
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
  getAllProductItems(
    args?: IGenericArgs<IProductItem>,
  ): Promise<IProductItem[]> {
    throw new Error('Method not implemented.');
  }
  getAllProductItemsBy(
    fields: Partial<IProductItem>,
    args?: IGenericArgs<IProductItem>,
  ): Promise<IProductItem[]> {
    throw new Error('Method not implemented.');
  }
  getProductItemById(id: string): Promise<IProductItem> {
    throw new Error('Method not implemented.');
  }
  getOneProductItemBy(
    fields: Partial<IProductItem>,
    args?: IGenericArgs<IProductItem>,
  ): Promise<IProductItem> {
    throw new Error('Method not implemented.');
  }
  createProductItem(
    createProductItemInput: CreateProductItemInput,
  ): Promise<IProductItem> {
    throw new Error('Method not implemented.');
  }
  updateProductItem(
    id: string,
    updateProductItemInput: UpdateProductItemInput,
  ): Promise<IProductItem> {
    throw new Error('Method not implemented.');
  }
  removeProductItem(id: string): Promise<IProductItem> {
    throw new Error('Method not implemented.');
  }
}
