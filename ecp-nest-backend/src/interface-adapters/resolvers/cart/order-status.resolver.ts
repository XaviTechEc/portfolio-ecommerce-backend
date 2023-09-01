import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreateOrderStatusInput,
  PaginationArgs,
  SearchArgs,
  UpdateOrderStatusInput,
} from 'src/core/dtos';
import { IOrderStatus } from 'src/core/entities';
import { OrderStatusType } from 'src/core/object-types';
import { OrderStatusUseCases } from 'src/use-cases';

@Resolver(() => OrderStatusType)
export class OrderStatusResolver {
  constructor(private orderStatusUseCases: OrderStatusUseCases) {}

  @Query(() => [OrderStatusType], { name: 'allOrderStatus' })
  getAllOrderStatus(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs<IOrderStatus>,
  ): Promise<IOrderStatus[]> {
    return this.orderStatusUseCases.getAllOrderStatus({
      paginationArgs,
      searchArgs,
    });
  }

  @Query(() => OrderStatusType, { name: 'orderStatus' })
  getOrderStatusById(id: string): Promise<IOrderStatus> {
    return this.orderStatusUseCases.getOrderStatusById(id);
  }

  @Mutation(() => OrderStatusType)
  createOrderStatus(
    createOrderStatusInput: CreateOrderStatusInput,
  ): Promise<IOrderStatus> {
    return this.orderStatusUseCases.createOrderStatus(createOrderStatusInput);
  }

  @Mutation(() => OrderStatusType)
  updateOrderStatus(
    id: string,
    updateOrderStatusInput: UpdateOrderStatusInput,
  ): Promise<IOrderStatus> {
    return this.orderStatusUseCases.updateOrderStatus(
      id,
      updateOrderStatusInput,
    );
  }

  @Mutation(() => OrderStatusType)
  removeOrderStatus(id: string): Promise<IOrderStatus> {
    return this.orderStatusUseCases.removeOrderStatus(id);
  }
}
