import { IShoppingCartProductItem } from '../../entities/shopping-cart-product-item.entity';
import { IShoppingCartProductItemRepository } from '../repositories/shopping-cart-product-item.repository';

export abstract class IShoppingCartProductItemsDataSourceService {
  abstract shoppingCartProductItems: IShoppingCartProductItemRepository<IShoppingCartProductItem>;
}
