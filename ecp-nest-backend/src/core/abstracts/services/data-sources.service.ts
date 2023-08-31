import {
  IAddress,
  ICategory,
  ICategoryPromotion,
  IComment,
  ICountry,
  ILocation,
  IOrderLine,
  IOrderStatus,
  IPaymentMethod,
  IProduct,
  IProductCategory,
  IProductConfiguration,
  IProductItem,
  IProductPromotion,
  IProductTag,
  IPromotion,
  IReview,
  ISeason,
  IShippingMethod,
  IShopOrder,
  IShoppingCart,
  IShoppingCartProductItem,
  ITag,
  IUser,
  IUserAddress,
  IUserPaymentMethod,
  IVariation,
  IVariationOption,
} from 'src/core/entities';
import {
  IAddressesRepository,
  ICategoriesRepository,
  ICommentsRepository,
  ICountriesRepository,
  ILocationsRepository,
  IOrderLinesRepository,
  IOrderStatusRepository,
  IPaymentMethodsRepository,
  IProductItemsRepository,
  IProductsRepository,
  IPromotionsRepository,
  IReviewsRepository,
  ISeasonsRepository,
  IShippingMethodsRepository,
  IShopOrdersRepository,
  IShoppingCartsRepository,
  ITagsRepository,
  IUserPaymentMethodsRepository,
  IUsersRepository,
  IVariationOptionsRepository,
  IVariationsRepository,
} from '../repositories';
import { IGenericDataMethodsRepository } from '../generic-data-methods.repository';

export abstract class IDataSourcesService {
  // Addresses
  abstract addresses: IAddressesRepository<IAddress>;
  // abstract countries: ICountriesRepository<ICountry>;
  // abstract locations: ILocationsRepository<ILocation>;

  // // Cart
  // abstract orderLines: IOrderLinesRepository<IOrderLine>;
  // abstract orderStatus: IOrderStatusRepository<IOrderStatus>;
  // abstract shippingMethods: IShippingMethodsRepository<IShippingMethod>;
  // abstract shopOrders: IShopOrdersRepository<IShopOrder>;
  // abstract shoppingCarts: IShoppingCartsRepository<IShoppingCart>;

  // // Categories
  // abstract categories: ICategoriesRepository<ICategory>;

  // // Comments
  // abstract comments: ICommentsRepository<IComment>;

  // // Payments
  // abstract paymentMethods: IPaymentMethodsRepository<IPaymentMethod>;
  // abstract userPaymentMethods: IUserPaymentMethodsRepository<IUserPaymentMethod>;

  // // Products
  // abstract productItems: IProductItemsRepository<IProductItem>;
  // abstract products: IProductsRepository<IProduct>;

  // // Promotions
  // abstract promotions: IPromotionsRepository<IPromotion>;

  // // Reviews
  // abstract reviews: IReviewsRepository<IReview>;

  // // Seasons
  // abstract seasons: ISeasonsRepository<ISeason>;

  // // Shared
  // abstract categoryPromotions: IGenericDataMethodsRepository<ICategoryPromotion>;
  // abstract productCategories: IGenericDataMethodsRepository<IProductCategory>;
  // abstract productConfigurations: IGenericDataMethodsRepository<IProductConfiguration>;
  // abstract productPromotions: IGenericDataMethodsRepository<IProductPromotion>;
  // abstract productTags: IGenericDataMethodsRepository<IProductTag>;
  // abstract shoppingCartProductItems: IGenericDataMethodsRepository<IShoppingCartProductItem>;
  // abstract userAddresses: IGenericDataMethodsRepository<IUserAddress>;

  // // Tags
  // abstract tags: ITagsRepository<ITag>;

  // // Users
  // abstract users: IUsersRepository<IUser>;

  // // Variations
  // abstract variations: IVariationsRepository<IVariation>;
  // abstract variationOptions: IVariationOptionsRepository<IVariationOption>;
}
