import { ParseUUIDPipe } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  PaginationArgs,
  SearchArgs,
} from 'src/common/domain/dtos/graphql/args';
import { OrderStatusUseCases } from 'src/order-status/application/use-cases/order-status-use-cases';
import {
  CreateOrderStatusInput,
  UpdateOrderStatusInput,
} from 'src/order-status/domain/dtos/graphql/inputs/order-status.input';
import { OrderStatusType } from 'src/order-status/domain/object-types/order-status.type';

@Resolver(() => OrderStatusType)
export class OrderStatusResolver {
  constructor(private orderStatusUseCases: OrderStatusUseCases) {}

  @Query(() => [OrderStatusType], { name: 'allOrderStatus' })
  getAllOrderStatus(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ) {
    return this.orderStatusUseCases.getAllOrderStatus({
      paginationArgs,
      searchArgs,
    });
  }

  @Query(() => OrderStatusType, { name: 'orderStatus' })
  getOrderStatusById(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ) {
    return this.orderStatusUseCases.getOrderStatusById(id);
  }

  @Mutation(() => OrderStatusType)
  createOrderStatus(
    @Args('createOrderStatusInput')
    createOrderStatusInput: CreateOrderStatusInput,
  ) {
    return this.orderStatusUseCases.createOrderStatus(createOrderStatusInput);
  }

  @Mutation(() => OrderStatusType)
  updateOrderStatus(
    @Args('updateOrderStatusInput')
    updateOrderStatusInput: UpdateOrderStatusInput,
  ) {
    return this.orderStatusUseCases.updateOrderStatus(
      updateOrderStatusInput.id,
      updateOrderStatusInput,
    );
  }

  @Mutation(() => OrderStatusType)
  removeOrderStatus(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string) {
    return this.orderStatusUseCases.removeOrderStatus(id);
  }
}
