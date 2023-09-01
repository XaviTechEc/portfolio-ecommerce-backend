import { Injectable } from '@nestjs/common';
import { IShoppingCartProductItemRepository } from 'src/core/abstracts/repositories';
import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
import { IShoppingCartProductItem } from 'src/core/entities';
import { ShoppingCartProductItemFactoryService } from '../factory';
import {
  IGenericArgs,
  CreateShoppingCartProductItemInput,
  UpdateShoppingCartProductItemInput,
} from 'src/core/dtos';

@Injectable()
export class ShoppingCartProductItemUseCases
  implements IShoppingCartProductItemRepository<IShoppingCartProductItem>
{
  constructor(
    private dataService: IDataSourcesService,
    private shoppingCartProductItemFactoryService: ShoppingCartProductItemFactoryService,
  ) {}
  getAllShoppingCartProductItem(
    args?: IGenericArgs<IShoppingCartProductItem>,
  ): Promise<IShoppingCartProductItem[]> {
    return this.dataService.shoppingCartProductItems.getAllShoppingCartProductItem(
      args,
    );
  }
  getOneShoppingCartProductItemById(
    id: string,
  ): Promise<IShoppingCartProductItem> {
    return this.dataService.shoppingCartProductItems.getOneShoppingCartProductItemById(
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
  updateOneShoppingCartProductItemById(
    id: string,
    updateShoppingCartProductItemInput: UpdateShoppingCartProductItemInput,
  ): Promise<IShoppingCartProductItem> {
    const shoppingCartProductItem =
      this.shoppingCartProductItemFactoryService.updateShoppingCartProductItem(
        updateShoppingCartProductItemInput,
      );
    return this.dataService.shoppingCartProductItems.updateOneShoppingCartProductItemById(
      id,
      shoppingCartProductItem,
    );
  }
  deleteOneShoppingCartProductItemById(
    id: string,
  ): Promise<IShoppingCartProductItem> {
    return this.dataService.shoppingCartProductItems.deleteOneShoppingCartProductItemById(
      id,
    );
  }
}
