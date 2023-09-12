import { ParseUUIDPipe } from '@nestjs/common';
import { Resolver, Args, ID, Mutation, Query } from '@nestjs/graphql';
import {
  PaginationArgs,
  SearchArgs,
} from 'src/common/domain/dtos/graphql/args';
import { OrderStatusUseCases } from 'src/order-status/application/use-cases/order-status-use-cases';
import {
  CreateOrderStatusInput,
  UpdateOrderStatusInput,
} from 'src/order-status/domain/dtos/graphql/inputs/order-status.input';
import { IOrderStatus } from 'src/order-status/domain/entities/order-status.entity';
import { OrderStatusType } from 'src/order-status/domain/object-types/order-status.type';

@Resolver(() => OrderStatusType)
export class OrderStatusResolver {
  constructor(private orderStatusUseCases: OrderStatusUseCases) {}

  @Query(() => [OrderStatusType], { name: 'allOrderStatus' })
  getAllOrderStatus(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ): Promise<IOrderStatus[]> {
    return this.orderStatusUseCases.getAllOrderStatus({
      paginationArgs,
      searchArgs,
    });
  }

  @Query(() => OrderStatusType, { name: 'orderStatus' })
  getOrderStatusById(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<IOrderStatus> {
    return this.orderStatusUseCases.getOrderStatusById(id);
  }

  @Mutation(() => OrderStatusType)
  createOrderStatus(
    @Args('createOrderStatusInput')
    createOrderStatusInput: CreateOrderStatusInput,
  ): Promise<IOrderStatus> {
    return this.orderStatusUseCases.createOrderStatus(createOrderStatusInput);
  }

  @Mutation(() => OrderStatusType)
  updateOrderStatus(
    @Args('updateOrderStatusInput')
    updateOrderStatusInput: UpdateOrderStatusInput,
  ): Promise<IOrderStatus> {
    return this.orderStatusUseCases.updateOrderStatus(
      updateOrderStatusInput.id,
      updateOrderStatusInput,
    );
  }

  @Mutation(() => OrderStatusType)
  removeOrderStatus(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<IOrderStatus> {
    return this.orderStatusUseCases.removeOrderStatus(id);
  }
}
