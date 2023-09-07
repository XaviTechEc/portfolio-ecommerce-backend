import { ParseUUIDPipe } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreateOrderLineInput,
  PaginationArgs,
  SearchArgs,
  UpdateOrderLineInput,
} from 'src/core/dtos';
import { IOrderLine } from 'src/core/entities';
import { OrderLineType } from 'src/core/object-types';
import { OrderLineUseCases } from 'src/use-cases';

@Resolver(() => OrderLineType)
export class OrderLineResolver {
  constructor(private orderLineUseCases: OrderLineUseCases) {}

  @Query(() => [OrderLineType], { name: 'orderLines' })
  getAllOrderLines(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ): Promise<IOrderLine[]> {
    return this.orderLineUseCases.getAllOrderLines({
      paginationArgs,
      searchArgs,
    });
  }

  @Query(() => [OrderLineType], { name: 'orderLinesByProductItem' })
  getOrderLinesByProductItem(
    @Args({ name: 'term', type: () => String }) term: string,
    @Args() paginationArgs: PaginationArgs,
  ) {
    return this.orderLineUseCases.getOrderLinesBy(
      term,
      ['productItem'],
      paginationArgs,
    );
  }

  @Query(() => [OrderLineType], { name: 'orderLinesByShopOrder' })
  getOrderLinesByShopOrder(
    @Args({ name: 'term', type: () => String }) term: string,
    @Args() paginationArgs: PaginationArgs,
  ) {
    return this.orderLineUseCases.getOrderLinesBy(
      term,
      ['shopOrder'],
      paginationArgs,
    );
  }

  @Query(() => OrderLineType, { name: 'orderLine' })
  getOrderLineById(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<IOrderLine> {
    return this.orderLineUseCases.getOrderLineById(id);
  }

  @Mutation(() => OrderLineType)
  createOrderLine(
    @Args() createOrderLineInput: CreateOrderLineInput,
  ): Promise<IOrderLine> {
    return this.orderLineUseCases.createOrderLine(createOrderLineInput);
  }

  @Mutation(() => OrderLineType)
  updateOrderLine(
    @Args() updateOrderLineInput: UpdateOrderLineInput,
  ): Promise<IOrderLine> {
    return this.orderLineUseCases.updateOrderLine(
      updateOrderLineInput.id,
      updateOrderLineInput,
    );
  }

  @Mutation(() => OrderLineType)
  removeOrderLine(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<IOrderLine> {
    return this.orderLineUseCases.removeOrderLine(id);
  }
}
