import { IShopOrderLocation } from '../../entities/shop-order-locations.entity';
import { IShopOrderLocationRepository } from '../repositories/shop-order-location.repository';

export abstract class IShopOrderLocationsDataSourceService {
  abstract shopOrderLocations: IShopOrderLocationRepository<IShopOrderLocation>;
}
