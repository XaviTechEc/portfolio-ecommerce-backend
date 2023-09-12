import { IShopOrder } from '../../entities/shop-order.entity';
import { IShopOrdersRepository } from '../repositories/shop-orders.repository';

export abstract class IShopOrdersDataSourceService {
  abstract shopOrders: IShopOrdersRepository<IShopOrder>;
}
