import { IProductItem } from 'src/product-items/domain/entities/product-item.entity';
import { IShoppingCart } from 'src/shopping-carts/domain/entities/shopping-cart.entity';

export class IShoppingCartProductItem {
  id: string;
  quantity: number;
  shoppingCart: IShoppingCart;
  productItem: IProductItem;
}
