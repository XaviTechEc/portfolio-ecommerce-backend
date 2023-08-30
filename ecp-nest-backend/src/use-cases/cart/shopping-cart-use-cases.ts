import { Injectable } from '@nestjs/common';
import { IShoppingCartsRepository } from 'src/core/abstracts/repositories';
import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
import {
  CreateShoppingCartInput,
  UpdateShoppingCartInput,
} from 'src/core/dtos';
import { IShoppingCart } from 'src/core/entities';
import { ShoppingCartFactoryService } from './factory/shopping-cart-factory.service';
import { IGenericArgs } from 'src/core/abstracts/generic-args.repository';

@Injectable()
export class ShoppingCartUseCases
  implements IShoppingCartsRepository<IShoppingCart>
{
  constructor(
    private dataService: IDataSourcesService,
    private shoppingCartFactoryService: ShoppingCartFactoryService,
  ) {}
  getAllShoppingCarts(
    args: IGenericArgs<IShoppingCart>,
  ): Promise<IShoppingCart[]> {
    throw new Error('Method not implemented.');
  }
  getShoppingCartById(id: string): Promise<IShoppingCart> {
    throw new Error('Method not implemented.');
  }
  createShoppingCart(
    createShoppingCartInput: CreateShoppingCartInput,
  ): Promise<IShoppingCart> {
    throw new Error('Method not implemented.');
  }
  updateShoppingCart(
    id: string,
    updateShoppingCartInput: UpdateShoppingCartInput,
  ): Promise<IShoppingCart> {
    throw new Error('Method not implemented.');
  }
  removeShoppingCart(id: string): Promise<IShoppingCart> {
    throw new Error('Method not implemented.');
  }
}
