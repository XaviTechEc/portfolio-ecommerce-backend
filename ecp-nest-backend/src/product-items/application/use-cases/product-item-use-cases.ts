import { Injectable } from '@nestjs/common';
import { IDataSourcesService } from 'src/common/domain/abstracts/services';
import {
  PaginationArgs,
  IGenericArgs,
} from 'src/common/domain/dtos/graphql/args';
import { IProductItemsRepository } from 'src/product-items/domain/abstracts/repositories/product-item.repository';
import {
  CreateProductItemInput,
  UpdateProductItemInput,
} from 'src/product-items/domain/dtos/graphql/inputs/product-item.input';
import { IProductItem } from 'src/product-items/domain/entities/product-item.entity';
import { ProductItemFactoryService } from './factory/product-item-factory.service';

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
