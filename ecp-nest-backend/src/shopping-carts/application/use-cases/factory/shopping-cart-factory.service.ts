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
    newShoppingCart.active = createShoppingCartInput.active;
    return newShoppingCart;
  }
  updateShoppingCart(updateShoppingCartInput: UpdateShoppingCartInput) {
    const newShoppingCart = new IShoppingCart();
    newShoppingCart.id = updateShoppingCartInput.id;
    newShoppingCart.user = updateShoppingCartInput.user;
    newShoppingCart.active = updateShoppingCartInput.active;
    return newShoppingCart;
  }
}
