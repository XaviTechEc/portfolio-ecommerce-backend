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
  IProductItem,
  IPromotion,
  IReview,
  ISeason,
  IShippingMethod,
  IShopOrder,
  IShoppingCart,
  ITag,
  IUser,
  IUserPaymentMethod,
  IVariation,
  IVariationOption,
} from 'src/core/entities';
import {
  IGenericDataMethodsRepository,
  IGenericOptions,
} from '../repositories/shared/generic-data-methods.repository';

export abstract class IDataSourcesService {
  abstract users: IGenericDataMethodsRepository<IUser, IGenericOptions>;
  abstract addresses: IGenericDataMethodsRepository<IAddress, IGenericOptions>;
  abstract countries: IGenericDataMethodsRepository<ICountry, IGenericOptions>;
  abstract locations: IGenericDataMethodsRepository<ILocation, IGenericOptions>;
  abstract orderLines: IGenericDataMethodsRepository<
    IOrderLine,
    IGenericOptions
  >;
  abstract orderStatus: IGenericDataMethodsRepository<
    IOrderStatus,
    IGenericOptions
  >;
  abstract shippingMethods: IGenericDataMethodsRepository<
    IShippingMethod,
    IGenericOptions
  >;
  abstract shopOrders: IGenericDataMethodsRepository<
    IShopOrder,
    IGenericOptions
  >;
  abstract shoppingCarts: IGenericDataMethodsRepository<
    IShoppingCart,
    IGenericOptions
  >;
  abstract categories: IGenericDataMethodsRepository<
    ICategory,
    IGenericOptions
  >;
  abstract comments: IGenericDataMethodsRepository<IComment, IGenericOptions>;
  abstract paymentMethods: IGenericDataMethodsRepository<
    IPaymentMethod,
    IGenericOptions
  >;
  abstract userPaymentMethods: IGenericDataMethodsRepository<
    IUserPaymentMethod,
    IGenericOptions
  >;
  abstract products: IGenericDataMethodsRepository<IProduct, IGenericOptions>;
  abstract productItems: IGenericDataMethodsRepository<
    IProductItem,
    IGenericOptions
  >;
  abstract promotions: IGenericDataMethodsRepository<
    IPromotion,
    IGenericOptions
  >;
  abstract reviews: IGenericDataMethodsRepository<IReview, IGenericOptions>;
  abstract seasons: IGenericDataMethodsRepository<ISeason, IGenericOptions>;
  abstract tags: IGenericDataMethodsRepository<ITag, IGenericOptions>;
  abstract variationOptions: IGenericDataMethodsRepository<
    IVariationOption,
    IGenericOptions
  >;
  abstract variations: IGenericDataMethodsRepository<
    IVariation,
    IGenericOptions
  >;
}
