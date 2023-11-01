import { ParseUUIDPipe } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  PaginationArgs,
  SearchArgs,
} from 'src/common/domain/dtos/graphql/args';
import { OrderLineUseCases } from 'src/order-lines/application/use-cases/order-line-use-cases';
import {
  CreateOrderLineInput,
  UpdateOrderLineInput,
} from 'src/order-lines/domain/dtos/graphql/inputs/order-line.input';
import { OrderLineType } from 'src/order-lines/domain/object-types/order-line.type';

@Resolver(() => OrderLineType)
export class OrderLineResolver {
  constructor(private orderLineUseCases: OrderLineUseCases) {}

  @Query(() => [OrderLineType], { name: 'orderLines' })
  getAllOrderLines(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ) {
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
  getOrderLineById(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string) {
    return this.orderLineUseCases.getOrderLineById(id);
  }

  @Mutation(() => OrderLineType)
  createOrderLine(
    @Args('createOrderLineInput') createOrderLineInput: CreateOrderLineInput,
  ) {
    return this.orderLineUseCases.createOrderLine(createOrderLineInput);
  }

  @Mutation(() => OrderLineType)
  updateOrderLine(
    @Args('updateOrderLineInput') updateOrderLineInput: UpdateOrderLineInput,
  ) {
    return this.orderLineUseCases.updateOrderLine(
      updateOrderLineInput.id,
      updateOrderLineInput,
    );
  }

  @Mutation(() => OrderLineType)
  removeOrderLine(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string) {
    return this.orderLineUseCases.removeOrderLine(id);
  }
}
