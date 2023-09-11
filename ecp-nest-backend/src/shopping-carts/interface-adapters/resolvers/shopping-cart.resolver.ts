import { ParseUUIDPipe } from '@nestjs/common';
import {
  Resolver,
  Args,
  Mutation,
  Query,
  ID,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import {
  PaginationArgs,
  SearchArgs,
  CreateShoppingCartInput,
  UpdateShoppingCartInput,
} from 'src/core/dtos';
import { IShoppingCart } from 'src/core/entities';
import { ProductItemType, ShoppingCartType } from 'src/core/object-types';
import {
  ShoppingCartProductItemUseCases,
  ShoppingCartUseCases,
} from 'src/use-cases';

@Resolver(() => ShoppingCartType)
export class ShoppingCartResolver {
  constructor(
    private shoppingCartUseCases: ShoppingCartUseCases,
    private shoppingCartProductItemUseCases: ShoppingCartProductItemUseCases,
  ) {}

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

  @Query(() => [ShoppingCartType], { name: 'shoppingCartsByUser' })
  getShoppingCartsByUser(
    @Args({ name: 'term', type: () => String }) term: string,
    @Args() paginationArgs: PaginationArgs,
  ): Promise<IShoppingCart[]> {
    return this.shoppingCartUseCases.getShoppingCartsBy(
      term,
      ['user'],
      paginationArgs,
    );
  }

  @Query(() => ShoppingCartType, { name: 'shoppingCart' })
  getShoppingCartById(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<IShoppingCart> {
    return this.shoppingCartUseCases.getShoppingCartById(id);
  }

  @Mutation(() => ShoppingCartType)
  createShoppingCart(
    @Args('createShoppingCartInput')
    createShoppingCartInput: CreateShoppingCartInput,
  ): Promise<IShoppingCart> {
    return this.shoppingCartUseCases.createShoppingCart(
      createShoppingCartInput,
    );
  }

  @Mutation(() => ShoppingCartType)
  updateShoppingCart(
    @Args('updateShoppingCartInput')
    updateShoppingCartInput: UpdateShoppingCartInput,
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

  // === Resolve Fields ===
  @ResolveField(() => [ProductItemType], { name: 'productItems' })
  getAllProductItems(
    @Parent() shoppingCart: ShoppingCartType,
    @Args() paginationArgs: PaginationArgs,
  ) {
    return this.shoppingCartProductItemUseCases.getShoppingCartProductItemsBy(
      shoppingCart.id,
      ['shoppingCart'],
      paginationArgs,
    );
  }
}