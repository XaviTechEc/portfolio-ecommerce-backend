import { IAddressesRepository } from 'src/addresses/domain/abstracts/repositories/addresses.repository';
import { ICountriesRepository } from 'src/addresses/domain/abstracts/repositories/countries.repository';
import { ILocationsRepository } from 'src/addresses/domain/abstracts/repositories/locations.repository';
import { IAddress } from 'src/addresses/domain/entities/address.entity';
import { ICountry } from 'src/addresses/domain/entities/country.entity';
import { ILocation } from 'src/addresses/domain/entities/location.entity';
import { IAuthRepository } from 'src/auth/domain/abstracts/repositories/auth.repository';
import { ICategoriesRepository } from 'src/categories/domain/abstracts/repositories/categories.repository';
import { ICategory } from 'src/categories/domain/entities/category.entity';
import { ICategoryPromotionRepository } from 'src/category-promotions/domain/abstracts/repositories/category-promotion.repository';
import { ICategoryPromotion } from 'src/category-promotions/domain/entities/category-promotion.entity';
import { ICommentsRepository } from 'src/comments/domain/abstracts/repositories/comments.repository';
import { IComment } from 'src/comments/domain/entities/comment.entity';
import { IImageRepository } from 'src/images/domain/abstracts/repositories/image.repository';
import { IImage } from 'src/images/domain/entities/image.entity';
import { IOrderLinesRepository } from 'src/order-lines/domain/abstracts/repositories/order-lines.repository';
import { IOrderLine } from 'src/order-lines/domain/entities/order-line.entity';
import { IOrderStatusRepository } from 'src/order-status/domain/abstracts/repositories/order-status.repository';
import { IOrderStatus } from 'src/order-status/domain/entities/order-status.entity';
import { IPaymentMethodsRepository } from 'src/payment-methods/domain/abstracts/repositories/payment-methods.repository';
import { IPaymentMethod } from 'src/payment-methods/domain/entities/payment-method.entity';
import { IProductCategoryRepository } from 'src/product-categories/domain/abstracts/repositories/product-category.repository';
import { IProductCategory } from 'src/product-categories/domain/entities/product-category.entity';
import { IProductConfigurationRepository } from 'src/product-configurations/domain/abstracts/repositories/product-configuration.repository';
import { IProductConfiguration } from 'src/product-configurations/domain/entities/product-configuration.entity';
import { IProductItemsRepository } from 'src/product-items/domain/abstracts/repositories/product-item.repository';
import { IProductItem } from 'src/product-items/domain/entities/product-item.entity';
import { IProductPromotionRepository } from 'src/product-promotions/domain/abstracts/repositories/product-promotion.repository';
import { IProductPromotion } from 'src/product-promotions/domain/entities/product-promotion.entity';
import { IProductTagRepository } from 'src/product-tags/domain/abstracts/repositories/product-tag.repository';
import { IProductTag } from 'src/product-tags/domain/entities/product-tag.entity';
import { IProductsRepository } from 'src/products/domain/abstracts/repositories/product.repository';
import { IProduct } from 'src/products/domain/entities/product.entity';
import { IPromotionsRepository } from 'src/promotions/domain/abstracts/repositories/promotions.repository';
import { IPromotion } from 'src/promotions/domain/entities/promotion.entity';
import { IReviewsRepository } from 'src/reviews/domain/abstracts/repositories/reviews.repository';
import { IReview } from 'src/reviews/domain/entities/review.entity';
import { ISeasonsRepository } from 'src/seasons/domain/abstracts/repositories/seasons.repository';
import { ISeason } from 'src/seasons/domain/entities/season.entity';
import { IShippingMethodsRepository } from 'src/shipping-methods/domain/abstracts/repositories/shipping-methods.repository';
import { IShippingMethod } from 'src/shipping-methods/domain/entities/shipping-method.entity';
import { IShopOrderLocationRepository } from 'src/shop-order-locations/domain/abstracts/repositories/shop-order-location.repository';
import { IShopOrderLocation } from 'src/shop-order-locations/domain/entities/shop-order-locations.entity';
import { IShopOrdersRepository } from 'src/shop-orders/domain/abstracts/repositories/shop-orders.repository';
import { IShopOrder } from 'src/shop-orders/domain/entities/shop-order.entity';
import { IShoppingCartProductItemRepository } from 'src/shopping-cart-product-items/domain/abstracts/repositories/shopping-cart-product-item.repository';
import { IShoppingCartProductItem } from 'src/shopping-cart-product-items/domain/entities/shopping-cart-product-item.entity';
import { IShoppingCartsRepository } from 'src/shopping-carts/domain/abstracts/repositories/shopping-carts.repository';
import { IShoppingCart } from 'src/shopping-carts/domain/entities/shopping-cart.entity';
import { ITagsRepository } from 'src/tags/domain/abstracts/repositories/tags.repository';
import { ITag } from 'src/tags/domain/entities/tag.entity';
import { IUserAddressRepository } from 'src/user-addresses/domain/abstracts/repositories/user-address.repository';
import { IUserAddress } from 'src/user-addresses/domain/entities/user-address.entity';
import { IUserPaymentMethodsRepository } from 'src/user-payment-methods/domain/abstracts/repositories/user-payment-methods.repository';
import { IUserPaymentMethod } from 'src/user-payment-methods/domain/entities/user-payment-method.entity';
import { IUsersRepository } from 'src/users/domain/abstracts/repositories/users.repository';
import { IUser } from 'src/users/domain/entities/user.entity';
import { IVariationOptionsRepository } from 'src/variation-options/domain/abstracts/repositories/variation-options.repository';
import { IVariationOption } from 'src/variation-options/domain/entities/variation-option.entity';
import { IVariationsRepository } from 'src/variations/domain/abstracts/repositories/variations.repository';
import { IVariation } from 'src/variations/domain/entities/variation.entity';

export abstract class IDataSourcesService {
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

  // Tags
  abstract tags: ITagsRepository<ITag>;

  // Users
  abstract users: IUsersRepository<IUser>;

  // Variations
  abstract variations: IVariationsRepository<IVariation>;
  abstract variationOptions: IVariationOptionsRepository<IVariationOption>;

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

  // Cart
  abstract orderLines: IOrderLinesRepository<IOrderLine>;
  abstract orderStatus: IOrderStatusRepository<IOrderStatus>;
  abstract shippingMethods: IShippingMethodsRepository<IShippingMethod>;
  abstract shopOrders: IShopOrdersRepository<IShopOrder>;
  abstract shoppingCarts: IShoppingCartsRepository<IShoppingCart>;
}
