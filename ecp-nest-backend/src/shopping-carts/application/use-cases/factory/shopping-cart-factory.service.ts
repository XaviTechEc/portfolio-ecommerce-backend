import { Injectable } from '@nestjs/common';
import {
  CreateShoppingCartInput,
  UpdateShoppingCartInput,
} from 'src/shopping-carts/domain/dtos/graphql/inputs/shopping-cart.input';
import { IShoppingCart } from 'src/shopping-carts/domain/entities/shopping-cart.entity';

@Injectable()
export class ShoppingCartFactoryService {
  createShoppingCart(createShoppingCartInput: CreateShoppingCartInput) {
    const newShoppingCart = new IShoppingCart();
    newShoppingCart.user = createShoppingCartInput.user;
    return newShoppingCart;
  }
  updateShoppingCart(updateShoppingCartInput: UpdateShoppingCartInput) {
    const newShoppingCart = new IShoppingCart();
    newShoppingCart.user = updateShoppingCartInput.user;
    return newShoppingCart;
  }
}
