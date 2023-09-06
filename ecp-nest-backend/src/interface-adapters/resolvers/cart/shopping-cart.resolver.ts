import { ParseUUIDPipe } from '@nestjs/common';
import { Resolver, Args, Mutation, Query, ID } from '@nestjs/graphql';
import {
  PaginationArgs,
  SearchArgs,
  CreateShoppingCartInput,
  UpdateShoppingCartInput,
} from 'src/core/dtos';
import { IShoppingCart } from 'src/core/entities';
import { ShoppingCartType } from 'src/core/object-types';
import { ShoppingCartUseCases } from 'src/use-cases';

@Resolver(() => ShoppingCartType)
export class ShoppingCartResolver {
  constructor(private shoppingCartUseCases: ShoppingCartUseCases) {}

  @Query(() => [ShoppingCartType], { name: 'shoppingCarts' })
  getAllShoppingCarts(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ): Promise<IShoppingCart[]> {
    return this.shoppingCartUseCases.getAllShoppingCarts({
      paginationArgs,
      searchArgs,
    });
  }

  @Query(() => ShoppingCartType, { name: 'shoppingCart' })
  getShoppingCartById(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<IShoppingCart> {
    return this.shoppingCartUseCases.getShoppingCartById(id);
  }

  @Mutation(() => ShoppingCartType)
  createShoppingCart(
    @Args() createShoppingCartInput: CreateShoppingCartInput,
  ): Promise<IShoppingCart> {
    return this.shoppingCartUseCases.createShoppingCart(
      createShoppingCartInput,
    );
  }

  @Mutation(() => ShoppingCartType)
  updateShoppingCart(
    @Args() updateShoppingCartInput: UpdateShoppingCartInput,
  ): Promise<IShoppingCart> {
    return this.shoppingCartUseCases.updateShoppingCart(
      updateShoppingCartInput.id,
      updateShoppingCartInput,
    );
  }

  @Mutation(() => ShoppingCartType)
  removeShoppingCart(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<IShoppingCart> {
    return this.shoppingCartUseCases.removeShoppingCart(id);
  }
}
