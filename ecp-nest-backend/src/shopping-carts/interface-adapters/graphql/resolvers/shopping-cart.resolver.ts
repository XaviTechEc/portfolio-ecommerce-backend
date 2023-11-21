import { Resolver } from '@nestjs/graphql';
import { BaseResolver } from 'src/common/interface-adapters/graphql/resolvers/base-resolver.resolver';
import { ShoppingCartUseCases } from 'src/shopping-carts/application/use-cases/shopping-cart-use-cases';
import {
  CreateShoppingCartInput,
  UpdateShoppingCartInput,
} from 'src/shopping-carts/domain/dtos/graphql/inputs/shopping-cart.input';
import { ShoppingCartType } from 'src/shopping-carts/interface-adapters/graphql/object-types/shopping-cart.type';

@Resolver(() => ShoppingCartType)
export class ShoppingCartResolver extends BaseResolver(ShoppingCartType, {
  useCasesRef: ShoppingCartUseCases,
  createInputRef: CreateShoppingCartInput,
  updateInputRef: UpdateShoppingCartInput,
}) {
  constructor(private shoppingCartUseCases: ShoppingCartUseCases) {
    super(shoppingCartUseCases);
  }
}
