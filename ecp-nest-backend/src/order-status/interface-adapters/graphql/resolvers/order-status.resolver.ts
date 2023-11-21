import { Resolver } from '@nestjs/graphql';
import { BaseResolver } from 'src/common/interface-adapters/graphql/resolvers/base-resolver.resolver';
import { OrderStatusUseCases } from 'src/order-status/application/use-cases/order-status-use-cases';
import {
  CreateOrderStatusInput,
  UpdateOrderStatusInput,
} from 'src/order-status/domain/dtos/graphql/inputs/order-status.input';
import { OrderStatusType } from 'src/order-status/interface-adapters/graphql/object-types/order-status.type';

@Resolver(() => OrderStatusType)
export class OrderStatusResolver extends BaseResolver(OrderStatusType, {
  useCasesRef: OrderStatusUseCases,
  createInputRef: CreateOrderStatusInput,
  updateInputRef: UpdateOrderStatusInput,
}) {
  constructor(private orderStatusUseCases: OrderStatusUseCases) {
    super(orderStatusUseCases);
  }
}
