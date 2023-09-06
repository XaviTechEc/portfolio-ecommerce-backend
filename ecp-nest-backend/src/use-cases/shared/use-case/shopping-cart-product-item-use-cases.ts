import { Injectable } from '@nestjs/common';
import { IShoppingCartProductItemRepository } from 'src/core/abstracts/repositories';
import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
import { IShoppingCartProductItem } from 'src/core/entities';
import { ShoppingCartProductItemFactoryService } from '../factory';
import {
  IGenericArgs,
  CreateShoppingCartProductItemInput,
  UpdateShoppingCartProductItemInput,
  PaginationArgs,
} from 'src/core/dtos';

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
