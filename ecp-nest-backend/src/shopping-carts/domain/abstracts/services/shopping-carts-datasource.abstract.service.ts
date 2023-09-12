import { IShoppingCart } from '../../entities/shopping-cart.entity';
import { IShoppingCartsRepository } from '../repositories/shopping-carts.repository';

export abstract class IShoppingCartsDataSourceService {
  abstract shoppingCarts: IShoppingCartsRepository<IShoppingCart>;
}
