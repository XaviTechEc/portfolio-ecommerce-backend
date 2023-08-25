import { Injectable } from '@nestjs/common';
import { IProductItemsRepository } from 'src/core/abstracts/repositories';
import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
import { ProductItemFactoryService } from './factory/product-item-factory.service';
import { CreateProductItemInput, UpdateProductItemInput } from 'src/core/dtos';
import { IProductItem } from 'src/core/entities';

@Injectable()
export class ProductItemUseCases implements IProductItemsRepository {
  constructor(
    private dataService: IDataSourcesService,
    private productItemFactoryService: ProductItemFactoryService,
  ) {}
  getAllProductItems(): Promise<IProductItem[]> {
    return this.dataService.productItems.getAll();
  }
  getAllProductItemsBy(fields: Partial<IProductItem>): Promise<IProductItem[]> {
    return this.dataService.productItems.getAllBy(fields);
  }
  getProductItemById(id: string): Promise<IProductItem> {
    return this.dataService.productItems.getOneById(id);
  }
  getOneProductItemBy(fields: Partial<IProductItem>): Promise<IProductItem> {
    return this.dataService.productItems.getOneBy(fields);
  }
  createProductItem(
    createProductItemInput: CreateProductItemInput,
  ): Promise<IProductItem> {
    const productItem = this.productItemFactoryService.createProductItem(
      createProductItemInput,
    );
    return this.dataService.productItems.create(productItem);
  }
  updateProductItem(
    id: string,
    updateProductItemInput: UpdateProductItemInput,
  ): Promise<IProductItem> {
    const productItem = this.productItemFactoryService.updateProductItem(
      updateProductItemInput,
    );
    return this.dataService.productItems.updateOneById(id, productItem);
  }
  removeProductItem(id: string): Promise<IProductItem> {
    return this.dataService.productItems.deleteOneById(id);
  }
}
