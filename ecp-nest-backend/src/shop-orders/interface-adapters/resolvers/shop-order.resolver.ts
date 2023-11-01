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
import { LocationType } from 'src/addresses/domain/object-types/location.type';
import {
  PaginationArgs,
  SearchArgs,
} from 'src/common/domain/dtos/graphql/args';
import { StatusValue } from 'src/order-status/domain/enums/status-value.enum';
import { ShopOrderLocationUseCases } from 'src/shop-order-locations/application/use-cases/shop-order-location-use-cases';
import { ShopOrderUseCases } from 'src/shop-orders/application/use-cases/shop-order-use-cases';
import {
  CreateShopOrderInput,
  UpdateShopOrderInput,
} from 'src/shop-orders/domain/dtos/graphql/inputs/shop-order.input';
import { ShopOrderType } from 'src/shop-orders/domain/object-types/shop-order.type';

@Resolver(() => ShopOrderType)
export class ShopOrderResolver {
  constructor(
    private shopOrderUseCases: ShopOrderUseCases,
    private shopOrderLocationUseCases: ShopOrderLocationUseCases,
  ) {}

  @Query(() => [ShopOrderType], { name: 'shopOrders' })
  getAllShopOrders(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ) {
    return this.shopOrderUseCases.getAllShopOrders({
      paginationArgs,
      searchArgs,
    });
  }

  @Query(() => [ShopOrderType], { name: 'shopOrdersByUser' })
  getShopOrdersByUser(
    @Args({ name: 'term', type: () => String }) term: string,
    @Args() paginationArgs: PaginationArgs,
  ) {
    return this.shopOrderUseCases.getShopOrdersBy(
      term,
      ['user'],
      paginationArgs,
    );
  }

  @Query(() => [ShopOrderType], { name: 'shopOrdersByAddress' })
  getShopOrdersByAddress(
    @Args({ name: 'term', type: () => String }) term: string,
    @Args() paginationArgs: PaginationArgs,
  ) {
    return this.shopOrderUseCases.getShopOrdersBy(
      term,
      ['address'],
      paginationArgs,
    );
  }

  @Query(() => [ShopOrderType], { name: 'shopOrdersByShippingMethod' })
  getShopOrdersByShippingMethod(
    @Args({ name: 'term', type: () => String }) term: string,
    @Args() paginationArgs: PaginationArgs,
  ) {
    return this.shopOrderUseCases.getShopOrdersBy(
      term,
      ['shippingMethod'],
      paginationArgs,
    );
  }

  @Query(() => [ShopOrderType], { name: 'shopOrdersByOrderStatus' })
  getShopOrdersByOrderStatus(
    @Args({ name: 'term', type: () => StatusValue }) term: StatusValue,
    @Args() paginationArgs: PaginationArgs,
  ) {
    return this.shopOrderUseCases.getShopOrdersBy(
      term,
      ['orderStatus'],
      paginationArgs,
    );
  }

  @Query(() => ShopOrderType, { name: 'shopOrder' })
  getShopOrderById(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string) {
    return this.shopOrderUseCases.getShopOrderById(id);
  }

  @Mutation(() => ShopOrderType)
  createShopOrder(
    @Args('createShopOrderInput') createShopOrderInput: CreateShopOrderInput,
  ) {
    return this.shopOrderUseCases.createShopOrder(createShopOrderInput);
  }

  @Mutation(() => ShopOrderType)
  updateShopOrder(
    @Args('updateShopOrderInput') updateShopOrderInput: UpdateShopOrderInput,
  ) {
    return this.shopOrderUseCases.updateShopOrder(
      updateShopOrderInput.id,
      updateShopOrderInput,
    );
  }

  @Mutation(() => ShopOrderType)
  removeShopOrder(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string) {
    return this.shopOrderUseCases.removeShopOrder(id);
  }

  // === Resolve Fields ===
  @ResolveField(() => [LocationType], { name: 'locations' })
  async getLocations(
    @Parent() shopOrder: ShopOrderType,
    @Args() paginationArgs: PaginationArgs,
  ) {
    return this.shopOrderLocationUseCases.getShopOrderLocationsBy(
      shopOrder.id,
      ['shopOrder'],
      paginationArgs,
    );
  }
}
