import { Resolver } from '@nestjs/graphql';
import { BaseResolver } from 'src/common/interface-adapters/graphql/resolvers/base-resolver.resolver';
import { ShoppingCartProductItemUseCases } from 'src/shopping-cart-product-items/application/use-cases/shopping-cart-product-item-use-cases';
import {
  CreateShoppingCartProductItemInput,
  UpdateShoppingCartProductItemInput,
} from 'src/shopping-cart-product-items/domain/dtos/graphql/inputs/shopping-cart-product-item.input';
import { ShoppingCartProductItemType } from 'src/shopping-cart-product-items/interface-adapters/graphql/object-types/shopping-cart-product-item.type';

@Resolver(() => ShoppingCartProductItemType)
export class ShoppingCartProductItemResolver extends BaseResolver(
  ShoppingCartProductItemType,
  {
    useCasesRef: ShoppingCartProductItemUseCases,
    createInputRef: CreateShoppingCartProductItemInput,
    updateInputRef: UpdateShoppingCartProductItemInput,
  },
) {
  constructor(
    private shoppingCartProductItemUseCases: ShoppingCartProductItemUseCases,
  ) {
    super(shoppingCartProductItemUseCases);
  }
}
