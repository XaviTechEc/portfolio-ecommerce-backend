import { Injectable } from '@nestjs/common';
import { IShoppingCartsRepository } from 'src/core/abstracts/repositories';
import { IDataSourcesService } from 'src/core/abstracts/services/data-services/data-sources.service';
import {
  CreateShoppingCartInput,
  PaginationArgs,
  UpdateShoppingCartInput,
} from 'src/core/dtos';
import { IShoppingCart } from 'src/core/entities';
import { ShoppingCartFactoryService } from './factory/shopping-cart-factory.service';
import { IGenericArgs } from 'src/core/dtos/graphql/args/generic-args.repository';

@Injectable()
export class ShoppingCartUseCases
  implements IShoppingCartsRepository<IShoppingCart>
{
  constructor(
    private dataService: IDataSourcesService,
    private shoppingCartFactoryService: ShoppingCartFactoryService,
  ) {}
  getShoppingCartsBy(
    term: string,
    fields: (keyof IShoppingCart)[],
    paginationArgs: PaginationArgs,
  ): Promise<IShoppingCart[]> {
    return this.dataService.shoppingCarts.getShoppingCartsBy(
      term,
      fields,
      paginationArgs,
    );
  }
  getAllShoppingCarts(
    args: IGenericArgs<IShoppingCart>,
  ): Promise<IShoppingCart[]> {
    return this.dataService.shoppingCarts.getAllShoppingCarts(args);
  }
  getShoppingCartById(id: string): Promise<IShoppingCart> {
    return this.dataService.shoppingCarts.getShoppingCartById(id);
  }
  createShoppingCart(
    createShoppingCartInput: CreateShoppingCartInput,
  ): Promise<IShoppingCart> {
    const shoppingCart = this.shoppingCartFactoryService.createShoppingCart(
      createShoppingCartInput,
    );
    return this.dataService.shoppingCarts.createShoppingCart(shoppingCart);
  }
  updateShoppingCart(
    id: string,
    updateShoppingCartInput: UpdateShoppingCartInput,
  ): Promise<IShoppingCart> {
    const shoppingCart = this.shoppingCartFactoryService.updateShoppingCart(
      updateShoppingCartInput,
    );
    return this.dataService.shoppingCarts.updateShoppingCart(id, shoppingCart);
  }
  removeShoppingCart(id: string): Promise<IShoppingCart> {
    return this.dataService.shoppingCarts.removeShoppingCart(id);
  }
}
