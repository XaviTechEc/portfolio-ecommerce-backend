import { Injectable } from '@nestjs/common';
import {
  CreateShoppingCartProductItemInput,
  UpdateShoppingCartProductItemInput,
} from 'src/core/dtos';
import { IShoppingCartProductItem } from 'src/core/entities';

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
    return newShoppingCartProductItem;
  }
  updateShoppingCartProductItem(
    updateShoppingCartProductItemInput: UpdateShoppingCartProductItemInput,
  ) {
    const newShoppingCartProductItem = new IShoppingCartProductItem();
    newShoppingCartProductItem.quantity =
      updateShoppingCartProductItemInput.quantity;
    newShoppingCartProductItem.shoppingCart =
      updateShoppingCartProductItemInput.shoppingCart;
    newShoppingCartProductItem.productItem =
      updateShoppingCartProductItemInput.productItem;
    return newShoppingCartProductItem;
  }
}
