import { Resolver } from '@nestjs/graphql';
import { BaseResolver } from 'src/common/interface-adapters/graphql/resolvers/base-resolver.resolver';
import { OrderLineUseCases } from 'src/order-lines/application/use-cases/order-line-use-cases';
import {
  CreateOrderLineInput,
  UpdateOrderLineInput,
} from 'src/order-lines/domain/dtos/graphql/inputs/order-line.input';
import { OrderLineType } from 'src/order-lines/interface-adapters/graphql/object-types/order-line.type';

@Resolver(() => OrderLineType)
export class OrderLineResolver extends BaseResolver(OrderLineType, {
  useCasesRef: OrderLineUseCases,
  createInputRef: CreateOrderLineInput,
  updateInputRef: UpdateOrderLineInput,
}) {
  constructor(private orderLineUseCases: OrderLineUseCases) {
    super(orderLineUseCases);
  }
}
