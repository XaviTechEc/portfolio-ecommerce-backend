import { IShoppingCartProductItem } from '../../entities/shopping-cart-product-item.entity';
import { IShoppingCartProductItemsRepository } from '../repositories/shopping-cart-product-item.repository';

export abstract class IShoppingCartProductItemsDataSourceService {
  abstract shoppingCartProductItems: IShoppingCartProductItemsRepository<IShoppingCartProductItem>;
}
