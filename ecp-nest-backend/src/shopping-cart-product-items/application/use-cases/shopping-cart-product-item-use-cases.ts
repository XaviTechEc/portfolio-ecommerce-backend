import { Injectable } from '@nestjs/common';
import { IDataSourcesService } from 'src/common/domain/abstracts/services';
import {
  PaginationArgs,
  IGenericArgs,
} from 'src/common/domain/dtos/graphql/args';
import { IShoppingCartProductItemRepository } from 'src/shopping-cart-product-items/domain/abstracts/repositories/shopping-cart-product-item.repository';
import {
  CreateShoppingCartProductItemInput,
  UpdateShoppingCartProductItemInput,
} from 'src/shopping-cart-product-items/domain/dtos/graphql/inputs/shopping-cart-product-item.input';
import { IShoppingCartProductItem } from 'src/shopping-cart-product-items/domain/entities/shopping-cart-product-item.entity';
import { ShoppingCartProductItemFactoryService } from './factory/shopping-cart-product-item-factory.service';

@Injectable()
export class ShoppingCartProductItemUseCases
  implements IShoppingCartProductItemRepository<IShoppingCartProductItem>
{
  constructor(
    private dataService: IDataSourcesService,
    private shoppingCartProductItemFactoryService: ShoppingCartProductItemFactoryService,
  ) {}
  getShoppingCartProductItemsBy(
    term: string,
    fields: (keyof IShoppingCartProductItem)[],
    paginationArgs: PaginationArgs,
  ): Promise<IShoppingCartProductItem[]> {
    return this.dataService.shoppingCartProductItems.getShoppingCartProductItemsBy(
      term,
      fields,
      paginationArgs,
    );
  }
  getAllShoppingCartProductItem(
    args?: IGenericArgs<IShoppingCartProductItem>,
  ): Promise<IShoppingCartProductItem[]> {
    return this.dataService.shoppingCartProductItems.getAllShoppingCartProductItem(
      args,
    );
  }
  getShoppingCartProductItemById(
    id: string,
  ): Promise<IShoppingCartProductItem> {
    return this.dataService.shoppingCartProductItems.getShoppingCartProductItemById(
      id,
    );
  }
  createShoppingCartProductItem(
    createShoppingCartProductItemInput: CreateShoppingCartProductItemInput,
  ): Promise<IShoppingCartProductItem> {
    const shoppingCartProductItem =
      this.shoppingCartProductItemFactoryService.createShoppingCartProductItem(
        createShoppingCartProductItemInput,
      );
    return this.dataService.shoppingCartProductItems.createShoppingCartProductItem(
      shoppingCartProductItem,
    );
  }
  updateShoppingCartProductItem(
    id: string,
    updateShoppingCartProductItemInput: UpdateShoppingCartProductItemInput,
  ): Promise<IShoppingCartProductItem> {
    const shoppingCartProductItem =
      this.shoppingCartProductItemFactoryService.updateShoppingCartProductItem(
        updateShoppingCartProductItemInput,
      );
    return this.dataService.shoppingCartProductItems.updateShoppingCartProductItem(
      id,
      shoppingCartProductItem,
    );
  }
  removeShoppingCartProductItem(id: string): Promise<IShoppingCartProductItem> {
    return this.dataService.shoppingCartProductItems.removeShoppingCartProductItem(
      id,
    );
  }
}
