import { Resolver } from '@nestjs/graphql';
import { BaseResolver } from 'src/common/interface-adapters/graphql/resolvers/base-resolver.resolver';
import { ShopOrderUseCases } from 'src/shop-orders/application/use-cases/shop-order-use-cases';
import {
  CreateShopOrderInput,
  UpdateShopOrderInput,
} from 'src/shop-orders/domain/dtos/graphql/inputs/shop-order.input';
import { ShopOrderType } from 'src/shop-orders/interface-adapters/graphql/object-types/shop-order.type';

@Resolver(() => ShopOrderType)
export class ShopOrderResolver extends BaseResolver(ShopOrderType, {
  useCasesRef: ShopOrderUseCases,
  createInputRef: CreateShopOrderInput,
  updateInputRef: UpdateShopOrderInput,
}) {
  constructor(private shopOrderUseCases: ShopOrderUseCases) {
    super(shopOrderUseCases);
  }
}
