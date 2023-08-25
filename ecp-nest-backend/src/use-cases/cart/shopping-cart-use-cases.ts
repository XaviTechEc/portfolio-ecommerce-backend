import { Injectable } from '@nestjs/common';
import { IShoppingCartsRepository } from 'src/core/abstracts/repositories';
import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
import {
  CreateShoppingCartInput,
  UpdateShoppingCartInput,
} from 'src/core/dtos';
import { IShoppingCart } from 'src/core/entities';
import { ShoppingCartFactoryService } from './factory/shopping-cart-factory.service';

@Injectable()
export class ShoppingCartUseCases implements IShoppingCartsRepository {
  constructor(
    private dataService: IDataSourcesService,
    private shoppingCartFactoryService: ShoppingCartFactoryService,
  ) {}

  getShoppingCartById(id: string): Promise<IShoppingCart> {
    return this.dataService.shoppingCarts.getOneById(id);
  }

  createShoppingCart(
    createShoppingCartInput: CreateShoppingCartInput,
  ): Promise<IShoppingCart> {
    const shoppingCart = this.shoppingCartFactoryService.createShoppingCart(
      createShoppingCartInput,
    );
    return this.dataService.shoppingCarts.create(shoppingCart);
  }

  updateShoppingCart(
    id: string,
    updateShoppingCartInput: UpdateShoppingCartInput,
  ): Promise<IShoppingCart> {
    const shoppingCart = this.shoppingCartFactoryService.updateShoppingCart(
      updateShoppingCartInput,
    );
    return this.dataService.shoppingCarts.updateOneById(id, shoppingCart);
  }

  removeShoppingCart(id: string): Promise<IShoppingCart> {
    return this.dataService.shoppingCarts.deleteOneById(id);
  }
}
