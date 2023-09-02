import { ILocation } from '../addresses/location.entity';
import { IShopOrder } from '../cart/shop-order.entity';

export class IShopOrderLocation {
  shopOrder: IShopOrder;
  location: ILocation;
}
