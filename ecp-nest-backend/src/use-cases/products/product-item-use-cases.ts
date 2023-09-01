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
    return this.dataService.productItems.getAllProductItems(args);
  }
  getAllProductItemsBy(
    fields: Partial<IProductItem>,
    args?: IGenericArgs<IProductItem>,
  ): Promise<IProductItem[]> {
    return this.dataService.productItems.getAllProductItemsBy(fields, args);
  }
  getProductItemById(id: string): Promise<IProductItem> {
    return this.dataService.productItems.getProductItemById(id);
  }
  getOneProductItemBy(
    fields: Partial<IProductItem>,
    args?: IGenericArgs<IProductItem>,
  ): Promise<IProductItem> {
    return this.dataService.productItems.getOneProductItemBy(fields, args);
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
