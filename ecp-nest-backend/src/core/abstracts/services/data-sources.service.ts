import { IReview } from 'src/core/entities';
import { IReviewsRepository } from '../repositories';

export abstract class IDataSourcesService {
  //   abstract addresses: IGenericDataMethodsRepository<IAddress>;
  //   abstract countries: IGenericDataMethodsRepository<ICountry>;
  //   abstract locations: IGenericDataMethodsRepository<ILocation>;
  //   abstract orderLines: IGenericDataMethodsRepository<IOrderLine>;
  //   abstract orderStatus: IGenericDataMethodsRepository<IOrderStatus>;
  //   abstract shippingMethods: IGenericDataMethodsRepository<IShippingMethod>;
  //   abstract shopOrders: IGenericDataMethodsRepository<IShopOrder>;
  //   abstract shoppingCarts: IGenericDataMethodsRepository<IShoppingCart>;
  //   abstract categories: IGenericDataMethodsRepository<ICategory>;
  //   abstract comments: IGenericDataMethodsRepository<IComment>;
  //   abstract paymentMethods: IGenericDataMethodsRepository<IPaymentMethod>;
  //   abstract userPaymentMethods: IGenericDataMethodsRepository<IUserPaymentMethod>;
  //   abstract products: IGenericDataMethodsRepository<IProduct>;
  //   abstract productItems: IGenericDataMethodsRepository<IProductItem>;
  //   abstract promotions: IGenericDataMethodsRepository<IPromotion>;
  abstract reviews: IReviewsRepository<IReview>;
  // abstract seasons: IGenericDataMethodsRepository<ISeason>;
  // abstract tags: IGenericDataMethodsRepository<ITag>;
  // abstract users: IGenericDataMethodsRepository<IUser>;
  // abstract variationOptions: IGenericDataMethodsRepository<IVariationOption>;
  // abstract variations: IGenericDataMethodsRepository<IVariation>;
}
