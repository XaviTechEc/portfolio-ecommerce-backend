import { Resolver } from '@nestjs/graphql';
import { BaseResolver } from 'src/common/interface-adapters/graphql/resolvers/base-resolver.resolver';
import { ShippingMethodUseCases } from 'src/shipping-methods/application/use-cases/shipping-method-use-cases';
import {
  CreateShippingMethodInput,
  UpdateShippingMethodInput,
} from 'src/shipping-methods/domain/dtos/graphql/inputs/shipping-method.input';
import { ShippingMethodType } from 'src/shipping-methods/interface-adapters/graphql/object-types/shipping-method.type';

@Resolver(() => ShippingMethodType)
export class ShippingMethodResolver extends BaseResolver(ShippingMethodType, {
  useCasesRef: ShippingMethodUseCases,
  createInputRef: CreateShippingMethodInput,
  updateInputRef: UpdateShippingMethodInput,
}) {
  constructor(private shippingMethodUseCases: ShippingMethodUseCases) {
    super(shippingMethodUseCases);
  }
}
