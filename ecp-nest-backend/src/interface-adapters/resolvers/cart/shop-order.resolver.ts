import { ParseUUIDPipe } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreateShopOrderInput,
  PaginationArgs,
  SearchArgs,
  UpdateShopOrderInput,
} from 'src/core/dtos';
import { IShopOrder } from 'src/core/entities';
import { ShopOrderType } from 'src/core/object-types';
import { ShopOrderUseCases } from 'src/use-cases';

@Resolver(() => ShopOrderType)
export class ShopOrderResolver {
  constructor(private shopOrderUseCases: ShopOrderUseCases) {}

  @Query(() => [ShopOrderType], { name: 'shopOrdersBy' })
  getAllShopOrdersBy(
    fields: Partial<IShopOrder>,
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs<IShopOrder>,
  ): Promise<IShopOrder[]> {
    return this.shopOrderUseCases.getAllShopOrdersBy(fields, {
      paginationArgs,
      searchArgs,
    });
  }

  @Query(() => ShopOrderType, { name: 'shopOrderBy' })
  getOneShopOrderBy(
    fields: Partial<IShopOrder>,
    @Args() searchArgs: SearchArgs<IShopOrder>,
  ): Promise<IShopOrder> {
    return this.shopOrderUseCases.getOneShopOrderBy(fields, { searchArgs });
  }

  @Query(() => [ShopOrderType], { name: 'shopOrders' })
  getAllShopOrders(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs<IShopOrder>,
  ): Promise<IShopOrder[]> {
    return this.shopOrderUseCases.getAllShopOrders({
      paginationArgs,
      searchArgs,
    });
  }

  @Query(() => ShopOrderType, { name: 'shopOrder' })
  getShopOrderById(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<IShopOrder> {
    return this.shopOrderUseCases.getShopOrderById(id);
  }

  @Mutation(() => ShopOrderType)
  createShopOrder(
    @Args() createShopOrderInput: CreateShopOrderInput,
  ): Promise<IShopOrder> {
    return this.shopOrderUseCases.createShopOrder(createShopOrderInput);
  }

  @Mutation(() => ShopOrderType)
  updateShopOrder(
    @Args() updateShopOrderInput: UpdateShopOrderInput,
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
