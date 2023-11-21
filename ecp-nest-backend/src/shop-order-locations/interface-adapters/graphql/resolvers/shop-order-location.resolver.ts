import { Resolver } from '@nestjs/graphql';
import { BaseResolver } from 'src/common/interface-adapters/graphql/resolvers/base-resolver.resolver';
import { ShopOrderLocationUseCases } from 'src/shop-order-locations/application/use-cases/shop-order-location-use-cases';
import {
  CreateShopOrderLocationInput,
  UpdateShopOrderLocationInput,
} from 'src/shop-order-locations/domain/dtos/graphql/inputs/shop-order-location.input';
import { ShopOrderLocationType } from 'src/shop-order-locations/interface-adapters/graphql/object-types/shop-order-location.type';

@Resolver(() => ShopOrderLocationType)
export class ShopOrderLocationResolver extends BaseResolver(
  ShopOrderLocationType,
  {
    useCasesRef: ShopOrderLocationUseCases,
    createInputRef: CreateShopOrderLocationInput,
    updateInputRef: UpdateShopOrderLocationInput,
  },
) {
  constructor(private shopOrderLocationUseCases: ShopOrderLocationUseCases) {
    super(shopOrderLocationUseCases);
  }
}
