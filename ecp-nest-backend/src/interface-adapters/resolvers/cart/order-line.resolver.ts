import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
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
    @Args() searchArgs: SearchArgs<IOrderLine>,
  ): Promise<IOrderLine[]> {
    return this.orderLineUseCases.getAllOrderLines({
      paginationArgs,
      searchArgs,
    });
  }

  @Query(() => [OrderLineType], { name: 'orderLinesBy' })
  getAllOrderLinesBy(
    fields: Partial<IOrderLine>,
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs<IOrderLine>,
  ): Promise<IOrderLine[]> {
    return this.orderLineUseCases.getAllOrderLinesBy(fields, {
      paginationArgs,
      searchArgs,
    });
  }

  @Query(() => OrderLineType, { name: 'orderLine' })
  getOrderLineById(id: string): Promise<IOrderLine> {
    return this.orderLineUseCases.getOrderLineById(id);
  }

  @Query(() => OrderLineType, { name: 'orderLineBy' })
  getOneOrderLineBy(
    fields: Partial<IOrderLine>,
    @Args() searchArgs: SearchArgs<IOrderLine>,
  ): Promise<IOrderLine> {
    return this.orderLineUseCases.getOneOrderLineBy(fields, { searchArgs });
  }

  @Mutation(() => OrderLineType)
  createOrderLine(
    createOrderLineInput: CreateOrderLineInput,
  ): Promise<IOrderLine> {
    return this.orderLineUseCases.createOrderLine(createOrderLineInput);
  }

  @Mutation(() => OrderLineType)
  updateOrderLine(
    id: string,
    updateOrderLineInput: UpdateOrderLineInput,
  ): Promise<IOrderLine> {
    return this.orderLineUseCases.updateOrderLine(id, updateOrderLineInput);
  }

  @Mutation(() => OrderLineType)
  removeOrderLine(id: string): Promise<IOrderLine> {
    return this.orderLineUseCases.removeOrderLine(id);
  }
}
