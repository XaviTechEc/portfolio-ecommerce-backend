import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { IProductItem } from 'src/product-items/domain/entities/product-item.entity';
import { IShoppingCart } from 'src/shopping-carts/domain/entities/shopping-cart.entity';

export class IShoppingCartProductItem extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  id: string;
  quantity: number;
  shoppingCart: IShoppingCart;
  productItem: IProductItem;
}
