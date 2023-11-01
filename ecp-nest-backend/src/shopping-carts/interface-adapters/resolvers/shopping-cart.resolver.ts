import { ParseUUIDPipe } from '@nestjs/common';
import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import {
  PaginationArgs,
  SearchArgs,
} from 'src/common/domain/dtos/graphql/args';
import { ProductItemType } from 'src/product-items/domain/object-types/product-item.type';
import { ShoppingCartProductItemUseCases } from 'src/shopping-cart-product-items/application/use-cases/shopping-cart-product-item-use-cases';
import { ShoppingCartUseCases } from 'src/shopping-carts/application/use-cases/shopping-cart-use-cases';
import {
  CreateShoppingCartInput,
  UpdateShoppingCartInput,
} from 'src/shopping-carts/domain/dtos/graphql/inputs/shopping-cart.input';
import { ShoppingCartType } from 'src/shopping-carts/domain/object-types/shopping-cart.type';

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
  ) {
    return this.shoppingCartUseCases.getAllShoppingCarts({
      paginationArgs,
      searchArgs,
    });
  }

  @Query(() => [ShoppingCartType], { name: 'shoppingCartsByUser' })
  getShoppingCartsByUser(
    @Args({ name: 'term', type: () => String }) term: string,
    @Args() paginationArgs: PaginationArgs,
  ) {
    return this.shoppingCartUseCases.getShoppingCartsBy(
      term,
      ['user'],
      paginationArgs,
    );
  }

  @Query(() => ShoppingCartType, { name: 'shoppingCart' })
  getShoppingCartById(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ) {
    return this.shoppingCartUseCases.getShoppingCartById(id);
  }

  @Mutation(() => ShoppingCartType)
  createShoppingCart(
    @Args('createShoppingCartInput')
    createShoppingCartInput: CreateShoppingCartInput,
  ) {
    return this.shoppingCartUseCases.createShoppingCart(
      createShoppingCartInput,
    );
  }

  @Mutation(() => ShoppingCartType)
  updateShoppingCart(
    @Args('updateShoppingCartInput')
    updateShoppingCartInput: UpdateShoppingCartInput,
  ) {
    return this.shoppingCartUseCases.updateShoppingCart(
      updateShoppingCartInput.id,
      updateShoppingCartInput,
    );
  }

  @Mutation(() => ShoppingCartType)
  removeShoppingCart(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ) {
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
