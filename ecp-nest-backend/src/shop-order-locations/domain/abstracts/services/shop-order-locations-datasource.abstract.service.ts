import { IShopOrderLocation } from '../../entities/shop-order-locations.entity';
import { IShopOrderLocationsRepository } from '../repositories/shop-order-location.repository';

export abstract class IShopOrderLocationsDataSourceService {
  abstract shopOrderLocations: IShopOrderLocationsRepository<IShopOrderLocation>;
}
