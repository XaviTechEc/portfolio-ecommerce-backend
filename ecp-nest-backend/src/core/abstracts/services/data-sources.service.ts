import {
  IAddress,
  ICategory,
  IComment,
  ICountry,
  ILocation,
  IOrderLine,
  IOrderStatus,
  IPaymentMethod,
  IProduct,
  IShippingMethod,
  IShopOrder,
  IShoppingCart,
  IUser,
  IUserPaymentMethod,
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
  abstract categories: IGenericDataMethodsRepository<ICategory>;
  abstract comments: IGenericDataMethodsRepository<IComment>;
  abstract paymentMethods: IGenericDataMethodsRepository<IPaymentMethod>;
  abstract userPaymentMethods: IGenericDataMethodsRepository<IUserPaymentMethod>;
}
