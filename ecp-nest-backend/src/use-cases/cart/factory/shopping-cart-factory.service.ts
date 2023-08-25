import { Injectable } from '@nestjs/common';
import {
  CreateShoppingCartInput,
  UpdateShoppingCartInput,
} from 'src/core/dtos';
import { IShoppingCart } from 'src/core/entities';

@Injectable()
export class ShoppingCartFactoryService {
  createShoppingCart(createShoppingCartInput: CreateShoppingCartInput) {
    const newShoppingCart = new IShoppingCart();
    newShoppingCart.userId = createShoppingCartInput.userId;
    return newShoppingCart;
  }
  updateShoppingCart(updateShoppingCartInput: UpdateShoppingCartInput) {
    const newShoppingCart = new IShoppingCart();
    newShoppingCart.userId = updateShoppingCartInput.userId;
    return newShoppingCart;
  }
}
