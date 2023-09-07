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
    @Args() searchArgs: SearchArgs,
  ): Promise<IShoppingCartProductItem[]> {
    return this.shoppingCartProductItemUseCases.getAllShoppingCartProductItem({
      paginationArgs,
      searchArgs,
    });
  }

  @Query(() => [ShoppingCartProductItemType], {
    name: 'shoppingCartProductItemsByShoppingCart',
  })
  getAllByShoppingCart(
    @Args({ name: 'term', type: () => String }) term: string,
    @Args() paginationArgs: PaginationArgs,
  ): Promise<IShoppingCartProductItem[]> {
    return this.shoppingCartProductItemUseCases.getShoppingCartProductItemsBy(
      term,
      ['shoppingCart'],
      paginationArgs,
    );
  }

  @Query(() => [ShoppingCartProductItemType], {
    name: 'shoppingCartProductItemsByProductItem',
  })
  getAllByProductItem(
    @Args({ name: 'term', type: () => String }) term: string,
    @Args() paginationArgs: PaginationArgs,
  ): Promise<IShoppingCartProductItem[]> {
    return this.shoppingCartProductItemUseCases.getShoppingCartProductItemsBy(
      term,
      ['productItem'],
      paginationArgs,
    );
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
    @Args('createShoppingCartProductItemInput')
    createShoppingCartProductItemInput: CreateShoppingCartProductItemInput,
  ): Promise<IShoppingCartProductItem> {
    return this.shoppingCartProductItemUseCases.createShoppingCartProductItem(
      createShoppingCartProductItemInput,
    );
  }

  @Mutation(() => ShoppingCartProductItemType)
  updateShoppingCartProductItem(
    @Args('updateShoppingCartProductItemInput')
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
