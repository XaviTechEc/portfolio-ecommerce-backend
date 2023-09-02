import {
  IAddress,
  ICategory,
  ICategoryPromotion,
  IComment,
  ICountry,
  IImage,
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
  IShopOrderLocation,
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
  ICategoryPromotionRepository,
  ICommentsRepository,
  ICountriesRepository,
  IImageRepository,
  ILocationsRepository,
  IOrderLinesRepository,
  IOrderStatusRepository,
  IPaymentMethodsRepository,
  IProductCategoryRepository,
  IProductConfigurationRepository,
  IProductItemsRepository,
  IProductPromotionRepository,
  IProductTagRepository,
  IProductsRepository,
  IPromotionsRepository,
  IReviewsRepository,
  ISeasonsRepository,
  IShippingMethodsRepository,
  IShopOrderLocationRepository,
  IShopOrdersRepository,
  IShoppingCartProductItemRepository,
  IShoppingCartsRepository,
  ITagsRepository,
  IUserAddressRepository,
  IUserPaymentMethodsRepository,
  IUsersRepository,
  IVariationOptionsRepository,
  IVariationsRepository,
} from '../repositories';

export abstract class IDataSourcesService {
  // Addresses
  abstract addresses: IAddressesRepository<IAddress>;
  abstract countries: ICountriesRepository<ICountry>;
  abstract locations: ILocationsRepository<ILocation>;

  // // Cart
  abstract orderLines: IOrderLinesRepository<IOrderLine>;
  abstract orderStatus: IOrderStatusRepository<IOrderStatus>;
  abstract shippingMethods: IShippingMethodsRepository<IShippingMethod>;
  abstract shopOrders: IShopOrdersRepository<IShopOrder>;
  abstract shoppingCarts: IShoppingCartsRepository<IShoppingCart>;

  // Categories
  abstract categories: ICategoriesRepository<ICategory>;

  // Comments
  abstract comments: ICommentsRepository<IComment>;

  // Images
  abstract images: IImageRepository<IImage>;

  // Payments
  abstract paymentMethods: IPaymentMethodsRepository<IPaymentMethod>;

  // Products
  abstract productItems: IProductItemsRepository<IProductItem>;
  abstract products: IProductsRepository<IProduct>;

  // Promotions
  abstract promotions: IPromotionsRepository<IPromotion>;

  // Reviews
  abstract reviews: IReviewsRepository<IReview>;

  // Seasons
  abstract seasons: ISeasonsRepository<ISeason>;

  // Shared
  abstract categoryPromotions: ICategoryPromotionRepository<ICategoryPromotion>;
  abstract productCategories: IProductCategoryRepository<IProductCategory>;
  abstract productConfigurations: IProductConfigurationRepository<IProductConfiguration>;
  abstract productPromotions: IProductPromotionRepository<IProductPromotion>;
  abstract productTags: IProductTagRepository<IProductTag>;
  abstract shopOrderLocations: IShopOrderLocationRepository<IShopOrderLocation>;
  abstract shoppingCartProductItems: IShoppingCartProductItemRepository<IShoppingCartProductItem>;
  abstract userAddresses: IUserAddressRepository<IUserAddress>;
  abstract userPaymentMethods: IUserPaymentMethodsRepository<IUserPaymentMethod>;

  Tags;
  abstract tags: ITagsRepository<ITag>;

  // Users
  abstract users: IUsersRepository<IUser>;

  // Variations
  abstract variations: IVariationsRepository<IVariation>;
  abstract variationOptions: IVariationOptionsRepository<IVariationOption>;
}
