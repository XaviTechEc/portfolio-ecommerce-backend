import { IShoppingCart } from '../cart/shopping-cart.entity';
import { IProductItem } from '../products/product-item.entity';

export class IShoppingCartProductItem {
  id: string;
  quantity: number;
  shoppingCart: IShoppingCart;
  productItem: IProductItem;
}
