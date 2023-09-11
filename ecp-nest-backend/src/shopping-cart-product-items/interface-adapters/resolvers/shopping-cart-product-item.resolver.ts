import { ParseUUIDPipe } from '@nestjs/common';
import { Resolver, Args, ID, Mutation, Query } from '@nestjs/graphql';
import {
  PaginationArgs,
  SearchArgs,
} from 'src/common/domain/dtos/graphql/args';
import { ShoppingCartProductItemUseCases } from 'src/shopping-cart-product-items/application/use-cases/shopping-cart-product-item-use-cases';
import {
  CreateShoppingCartProductItemInput,
  UpdateShoppingCartProductItemInput,
} from 'src/shopping-cart-product-items/domain/dtos/graphql/inputs/shopping-cart-product-item.input';
import { IShoppingCartProductItem } from 'src/shopping-cart-product-items/domain/entities/shopping-cart-product-item.entity';
import { ShoppingCartProductItemType } from 'src/shopping-cart-product-items/domain/object-types/shopping-cart-product-item.type';

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
