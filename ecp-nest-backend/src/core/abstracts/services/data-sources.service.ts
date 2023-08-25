import {
  IAddress,
  ICountry,
  ILocation,
  IOrderLine,
  IOrderStatus,
  IProduct,
  IShippingMethod,
  IShopOrder,
  IShoppingCart,
  IUser,
} from 'src/core/entities';
import { IGenericDataMethodsRepository } from '../repositories/shared/generic-data-methods.repository';

export abstract class IDataSourcesService {
  abstract users: IGenericDataMethodsRepository<IUser>;
  abstract products: IGenericDataMethodsRepository<IProduct>;
  abstract addresses: IGenericDataMethodsRepository<IAddress>;
  abstract countries: IGenericDataMethodsRepository<ICountry>;
  abstract locations: IGenericDataMethodsRepository<ILocation>;
  abstract orderLines: IGenericDataMethodsRepository<IOrderLine>;
  abstract orderStatus: IGenericDataMethodsRepository<IOrderStatus>;
  abstract shippingMethods: IGenericDataMethodsRepository<IShippingMethod>;
  abstract shopOrders: IGenericDataMethodsRepository<IShopOrder>;
  abstract shoppingCarts: IGenericDataMethodsRepository<IShoppingCart>;
}
