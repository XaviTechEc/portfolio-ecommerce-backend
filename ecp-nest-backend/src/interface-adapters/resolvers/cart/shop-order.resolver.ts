import { ParseUUIDPipe } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreateShopOrderInput,
  PaginationArgs,
  SearchArgs,
  UpdateShopOrderInput,
} from 'src/core/dtos';
import { IShopOrder } from 'src/core/entities';
import { StatusValue } from 'src/core/enums';
import { ShopOrderType } from 'src/core/object-types';
import { ShopOrderUseCases } from 'src/use-cases';

@Resolver(() => ShopOrderType)
export class ShopOrderResolver {
  constructor(private shopOrderUseCases: ShopOrderUseCases) {}

  @Query(() => [ShopOrderType], { name: 'shopOrders' })
  getAllShopOrders(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ): Promise<IShopOrder[]> {
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
  getShopOrderById(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<IShopOrder> {
    return this.shopOrderUseCases.getShopOrderById(id);
  }

  @Mutation(() => ShopOrderType)
  createShopOrder(
    @Args('createShopOrderInput') createShopOrderInput: CreateShopOrderInput,
  ): Promise<IShopOrder> {
    return this.shopOrderUseCases.createShopOrder(createShopOrderInput);
  }

  @Mutation(() => ShopOrderType)
  updateShopOrder(
    @Args('updateShopOrderInput') updateShopOrderInput: UpdateShopOrderInput,
  ): Promise<IShopOrder> {
    return this.shopOrderUseCases.updateShopOrder(
      updateShopOrderInput.id,
      updateShopOrderInput,
    );
  }

  @Mutation(() => ShopOrderType)
  removeShopOrder(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<IShopOrder> {
    return this.shopOrderUseCases.removeShopOrder(id);
  }
}
