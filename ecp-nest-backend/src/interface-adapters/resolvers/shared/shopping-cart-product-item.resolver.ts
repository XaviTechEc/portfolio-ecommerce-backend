import { ParseUUIDPipe } from '@nestjs/common';
import { Resolver, Args, ID, Mutation, Query } from '@nestjs/graphql';
import {
  PaginationArgs,
  SearchArgs,
  CreateShoppingCartProductItemInput,
  UpdateShoppingCartProductItemInput,
} from 'src/core/dtos';
import { IShoppingCartProductItem } from 'src/core/entities';
import { ShoppingCartProductItemType } from 'src/core/object-types';
import { ShoppingCartProductItemUseCases } from 'src/use-cases';

@Resolver(() => ShoppingCartProductItemType)
export class ShoppingCartProductItemResolver {
  constructor(
    private shoppingCartProductItemUseCases: ShoppingCartProductItemUseCases,
  ) {}

  @Query(() => [ShoppingCartProductItemType], {
    name: 'shoppingCartProductItems',
  })
  getAllShoppingCartProductItem(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs<IShoppingCartProductItem>,
  ): Promise<IShoppingCartProductItem[]> {
    return this.shoppingCartProductItemUseCases.getAllShoppingCartProductItem({
      paginationArgs,
      searchArgs,
    });
  }

  @Query(() => ShoppingCartProductItemType, { name: 'shoppingCartProductItem' })
  getShoppingCartProductItemById(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<IShoppingCartProductItem> {
    return this.shoppingCartProductItemUseCases.getShoppingCartProductItemById(
      id,
    );
  }

  @Mutation(() => ShoppingCartProductItemType)
  createShoppingCartProductItem(
    @Args()
    createShoppingCartProductItemInput: CreateShoppingCartProductItemInput,
  ): Promise<IShoppingCartProductItem> {
    return this.shoppingCartProductItemUseCases.createShoppingCartProductItem(
      createShoppingCartProductItemInput,
    );
  }

  @Mutation(() => ShoppingCartProductItemType)
  updateShoppingCartProductItem(
    @Args()
    updateShoppingCartProductItemInput: UpdateShoppingCartProductItemInput,
  ): Promise<IShoppingCartProductItem> {
    return this.shoppingCartProductItemUseCases.updateShoppingCartProductItem(
      updateShoppingCartProductItemInput.id,
      updateShoppingCartProductItemInput,
    );
  }

  @Mutation(() => ShoppingCartProductItemType)
  removeShoppingCartProductItem(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<IShoppingCartProductItem> {
    return this.shoppingCartProductItemUseCases.removeShoppingCartProductItem(
      id,
    );
  }
}
