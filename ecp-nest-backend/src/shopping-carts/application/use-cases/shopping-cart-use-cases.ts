import { Injectable } from '@nestjs/common';
import { IDataSourcesService } from 'src/common/domain/abstracts/services';
import {
  PaginationArgs,
  IGenericArgs,
} from 'src/common/domain/dtos/graphql/args';
import { IShoppingCartsRepository } from 'src/shopping-carts/domain/abstracts/repositories/shopping-carts.repository';
import {
  CreateShoppingCartInput,
  UpdateShoppingCartInput,
} from 'src/shopping-carts/domain/dtos/graphql/inputs/shopping-cart.input';
import { IShoppingCart } from 'src/shopping-carts/domain/entities/shopping-cart.entity';
import { ShoppingCartFactoryService } from './factory/shopping-cart-factory.service';

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
