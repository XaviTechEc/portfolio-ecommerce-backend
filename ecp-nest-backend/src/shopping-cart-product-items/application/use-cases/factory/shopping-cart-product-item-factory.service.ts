import { Injectable } from '@nestjs/common';
import {
  CreateShoppingCartProductItemInput,
  UpdateShoppingCartProductItemInput,
} from 'src/shopping-cart-product-items/domain/dtos/graphql/inputs/shopping-cart-product-item.input';
import { IShoppingCartProductItem } from 'src/shopping-cart-product-items/domain/entities/shopping-cart-product-item.entity';

@Injectable()
export class ShoppingCartProductItemFactoryService {
  createShoppingCartProductItem(
    createShoppingCartProductItemInput: CreateShoppingCartProductItemInput,
  ) {
    const newShoppingCartProductItem = new IShoppingCartProductItem();
    newShoppingCartProductItem.quantity =
      createShoppingCartProductItemInput.quantity;
    newShoppingCartProductItem.shoppingCart =
      createShoppingCartProductItemInput.shoppingCart;
    newShoppingCartProductItem.productItem =
      createShoppingCartProductItemInput.productItem;
    newShoppingCartProductItem.active =
      createShoppingCartProductItemInput.active;
    return newShoppingCartProductItem;
  }
  updateShoppingCartProductItem(
    updateShoppingCartProductItemInput: UpdateShoppingCartProductItemInput,
  ) {
    const newShoppingCartProductItem = new IShoppingCartProductItem();
    newShoppingCartProductItem.id = updateShoppingCartProductItemInput.id;
    newShoppingCartProductItem.quantity =
      updateShoppingCartProductItemInput.quantity;
    newShoppingCartProductItem.shoppingCart =
      updateShoppingCartProductItemInput.shoppingCart;
    newShoppingCartProductItem.productItem =
      updateShoppingCartProductItemInput.productItem;
    newShoppingCartProductItem.active =
      updateShoppingCartProductItemInput.active;
    return newShoppingCartProductItem;
  }
}
