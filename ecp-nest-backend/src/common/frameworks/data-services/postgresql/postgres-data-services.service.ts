import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Address,
  Country,
  Location,
} from 'src/addresses/infrastructure/data/postgresql/entities';
import {
  AddressesRepository,
  CountriesRepository,
  LocationsRepository,
} from 'src/addresses/infrastructure/data/postgresql/repositories';
import { IAuthRepository } from 'src/auth/domain/abstracts/repositories/auth.repository';
import { AuthRepository } from 'src/auth/infrastructure/data/postgresql/repositories/auth.repository';
import { Category } from 'src/categories/infrastructure/data/postgresql/entities/Category.entity';
import { CategoriesRepository } from 'src/categories/infrastructure/data/postgresql/repositories/categories.repository';
import { CategoryPromotion } from 'src/category-promotions/infrastructure/data/postgresql/entities/CategoryPromotion.entity';
import { CategoryPromotionsRepository } from 'src/category-promotions/infrastructure/data/postgresql/repositories/category-promotion.repository';
import { Comment } from 'src/comments/infrastructure/data/postgresql/entities/Comment.entity';
import { CommentsRepository } from 'src/comments/infrastructure/data/postgresql/repositories/comments.repository';
import { IDataSourcesService } from 'src/common/domain/abstracts/services';
import { ExceptionsService } from 'src/common/infrastructure/exceptions/exceptions.service';
import { MyLoggerService } from 'src/common/infrastructure/logger/logger.service';
import { Image } from 'src/images/infrastructure/data/postgresql/entities/Image.entity';
import { ImagesRepository } from 'src/images/infrastructure/data/postgresql/repositories/images.repository';
import { OrderLine } from 'src/order-lines/infrastructure/data/postgresql/entities/OrderLine.entity';
import { OrderLinesRepository } from 'src/order-lines/infrastructure/data/postgresql/repositories/order-lines.repository';
import { OrderStatus } from 'src/order-status/infrastructure/data/postgresql/entities/OrderStatus.entity';
import { OrderStatusRepository } from 'src/order-status/infrastructure/data/postgresql/repositories/order-status.repository';
import { PaymentMethod } from 'src/payment-methods/infrastructure/data/postgresql/entities/PaymentMethod.entity';
import { PaymentMethodsRepository } from 'src/payment-methods/infrastructure/data/postgresql/repositories/payment-methods.repository';
import { ProductCategory } from 'src/product-categories/infrastructure/data/postgresql/entities/ProductCategory.entity';
import { ProductCategoriesRepository } from 'src/product-categories/infrastructure/data/postgresql/repositories/product-category.repository';
import { ProductConfiguration } from 'src/product-configurations/infrastructure/data/postgresql/entities/ProductConfiguration.entity';
import { ProductConfigurationsRepository } from 'src/product-configurations/infrastructure/data/postgresql/repositories/product-configuration.repository';
import { ProductItem } from 'src/product-items/infrastructure/data/postgresql/entities/ProductItem.entity';
import { ProductItemsRepository } from 'src/product-items/infrastructure/data/postgresql/repositories/product-items.repository';
import { ProductPromotion } from 'src/product-promotions/infrastructure/data/postgresql/entities/ProductPromotion.entity';
import { ProductPromotionsRepository } from 'src/product-promotions/infrastructure/data/postgresql/repositories/product-promotion.repository';
import { ProductTag } from 'src/product-tags/infrastructure/data/postgresql/entities/ProductTag.entity';
import { ProductTagsRepository } from 'src/product-tags/infrastructure/data/postgresql/repositories/product-tag.repository';
import { Product } from 'src/products/infrastructure/data/postgresql/entities/Product.entity';
import { ProductsRepository } from 'src/products/infrastructure/data/postgresql/repositories/products.repository';
import { Promotion } from 'src/promotions/infrastructure/data/postgresql/entities/Promotion.entity';
import { PromotionsRepository } from 'src/promotions/infrastructure/data/postgresql/repositories/promotions.repository';
import { Review } from 'src/reviews/infrastructure/data/postgresql/entities/Review.entity';
import { ReviewsRepository } from 'src/reviews/infrastructure/data/postgresql/repositories/review.repository';
import { Season } from 'src/seasons/infrastructure/data/postgresql/entities/Season.entity';
import { SeasonsRepository } from 'src/seasons/infrastructure/data/postgresql/repositories/seasons.repository';
import { ShippingMethod } from 'src/shipping-methods/infrastructure/data/postgresql/entities/ShippingMethod.entity';
import { ShippingMethodsRepository } from 'src/shipping-methods/infrastructure/data/postgresql/repositories/shipping-methods.repository';
import { ShopOrderLocationsRepository } from 'src/shop-order-locations/infrastructure/data/postgresql/repositories/shop-order-location.repository';
import { ShopOrder } from 'src/shop-orders/infrastructure/data/postgresql/entities/ShopOrder.entity';
import { ShopOrdersRepository } from 'src/shop-orders/infrastructure/data/postgresql/repositories/shop-orders.repository';
import { ShoppingCartProductItem } from 'src/shopping-cart-product-items/infrastructure/data/postgresql/entities/ShoppingCartProductItem.entity';
import { ShoppingCartProductItemsRepository } from 'src/shopping-cart-product-items/infrastructure/data/postgresql/repositories/shopping-cart-product-item.repository';
import { ShoppingCart } from 'src/shopping-carts/infrastructure/data/postgresql/entities/ShoppingCart.entity';
import { ShoppingCartsRepository } from 'src/shopping-carts/infrastructure/data/postgresql/repositories/shopping-carts.repository';
import { Tag } from 'src/tags/infrastructure/data/postgresql/entities/Tag.entity';
import { TagsRepository } from 'src/tags/infrastructure/data/postgresql/repositories/tags.repository';
import { UserAddress } from 'src/user-addresses/infrastructure/data/postgresql/entities/UserAddress.entity';
import { UserAddressesRepository } from 'src/user-addresses/infrastructure/data/postgresql/repositories/user-address.repository';
import { UserPaymentMethod } from 'src/user-payment-methods/infrastructure/data/postgresql/entities/UserPaymentMethod.entity';
import { UserPaymentMethodsRepository } from 'src/user-payment-methods/infrastructure/data/postgresql/repositories/user-payment-methods.repository';
import { User } from 'src/users/infrastructure/data/postgresql/entities/User.entity';
import { UsersRepository } from 'src/users/infrastructure/data/postgresql/repositories/users.repository';
import { VariationOption } from 'src/variation-options/infrastructure/data/postgresql/entities/VariationOption.entity';
import { VariationOptionsRepository } from 'src/variation-options/infrastructure/data/postgresql/repositories/variation-options.repository';
import { Variation } from 'src/variations/infrastructure/data/postgresql/entities/Variation.entity';
import { VariationsRepository } from 'src/variations/infrastructure/data/postgresql/repositories/variations.repository';
import { Repository } from 'typeorm';

@Injectable()
export class PostgresDataServices
  implements IDataSourcesService, OnApplicationBootstrap
{
  // Images
  images: ImagesRepository;

  // Payments
  paymentMethods: PaymentMethodsRepository;
  userPaymentMethods: UserPaymentMethodsRepository;

  // Products
  productItems: ProductItemsRepository;
  products: ProductsRepository;

  // Promotions
  promotions: PromotionsRepository;

  // Reviews
  reviews: ReviewsRepository;

  // Seasons
  seasons: SeasonsRepository;

  // Tags
  tags: TagsRepository;

  // Users
  users: UsersRepository;

  // Variations
  variations: VariationsRepository;
  variationOptions: VariationOptionsRepository;

  // Shared

  productCategories: ProductCategoriesRepository;
  productConfigurations: ProductConfigurationsRepository;
  productPromotions: ProductPromotionsRepository;
  productTags: ProductTagsRepository;
  shopOrderLocations: ShopOrderLocationsRepository;
  shoppingCartProductItems: ShoppingCartProductItemsRepository;
  userAddresses: UserAddressesRepository;

  // Cart
  orderLines: OrderLinesRepository;
  orderStatus: OrderStatusRepository;
  shippingMethods: ShippingMethodsRepository;
  shopOrders: ShopOrdersRepository;
  shoppingCarts: ShoppingCartsRepository;

  constructor(
    // Images
    @InjectRepository(Image)
    private imagesRepository: Repository<Image>,

    // Payments
    @InjectRepository(PaymentMethod)
    private paymentMethodsRepository: Repository<PaymentMethod>,
    @InjectRepository(UserPaymentMethod)
    private userPaymentMethodsRepository: Repository<UserPaymentMethod>,

    // Products
    @InjectRepository(ProductItem)
    private productItemsRepository: Repository<ProductItem>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,

    // Promotions
    @InjectRepository(Promotion)
    private promotionsRepository: Repository<Promotion>,

    // Reviews
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>,

    // Seasons
    @InjectRepository(Season)
    private seasonsRepository: Repository<Season>,

    // Tags
    @InjectRepository(Tag)
    private tagsRepository: Repository<Tag>,

    // Users
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    // Variations
    @InjectRepository(Variation)
    private variationsRepository: Repository<Variation>,
    @InjectRepository(VariationOption)
    private variationOptionsRepository: Repository<VariationOption>,

    // Shared

    @InjectRepository(ProductCategory)
    private productCategoriesRepository: Repository<ProductCategory>,
    @InjectRepository(ProductConfiguration)
    private productConfigurationsRepository: Repository<ProductConfiguration>,
    @InjectRepository(ProductPromotion)
    private productPromotionsRepository: Repository<ProductPromotion>,
    @InjectRepository(ProductTag)
    private productTagsRepository: Repository<ProductTag>,
    @InjectRepository(ShoppingCartProductItem)
    private shoppingCartProductItemsRepository: Repository<ShoppingCartProductItem>,
    @InjectRepository(UserAddress)
    private userAddressesRepository: Repository<UserAddress>,

    // Cart
    @InjectRepository(OrderLine)
    private orderLinesRepository: Repository<OrderLine>,
    @InjectRepository(OrderStatus)
    private orderStatusRepository: Repository<OrderStatus>,
    @InjectRepository(ShippingMethod)
    private shippingMethodsRepository: Repository<ShippingMethod>,
    @InjectRepository(ShopOrder)
    private shopOrdersRepository: Repository<ShopOrder>,
    @InjectRepository(ShoppingCart)
    private shoppingCartsRepository: Repository<ShoppingCart>,

    private _loggerService: MyLoggerService,
    private _exceptionsService: ExceptionsService,
  ) {}

  onApplicationBootstrap() {
    // Images
    this.images = new ImagesRepository(
      this.imagesRepository,
      this._loggerService,
      this._exceptionsService,
    );

    // Payments
    this.paymentMethods = new PaymentMethodsRepository(
      this.paymentMethodsRepository,
      this._loggerService,
      this._exceptionsService,
    );
    this.userPaymentMethods = new UserPaymentMethodsRepository(
      this.userPaymentMethodsRepository,
      this._loggerService,
      this._exceptionsService,
    );

    // Products
    this.productItems = new ProductItemsRepository(
      this.productItemsRepository,
      this._loggerService,
      this._exceptionsService,
    );
    this.products = new ProductsRepository(
      this.productsRepository,
      this._loggerService,
      this._exceptionsService,
    );

    // Promotions
    this.promotions = new PromotionsRepository(
      this.promotionsRepository,
      this._loggerService,
      this._exceptionsService,
    );

    // Reviews
    this.reviews = new ReviewsRepository(
      this.reviewsRepository,
      this._loggerService,
      this._exceptionsService,
    );

    // Seasons
    this.seasons = new SeasonsRepository(
      this.seasonsRepository,
      this._loggerService,
      this._exceptionsService,
    );

    // Tags
    this.tags = new TagsRepository(
      this.tagsRepository,
      this._loggerService,
      this._exceptionsService,
    );

    // Users
    this.users = new UsersRepository(
      this.usersRepository,
      this._loggerService,
      this._exceptionsService,
    );

    // Variations
    this.variations = new VariationsRepository(
      this.variationsRepository,
      this._loggerService,
      this._exceptionsService,
    );

    this.variationOptions = new VariationOptionsRepository(
      this.variationOptionsRepository,
      this._loggerService,
      this._exceptionsService,
    );

    // Cart
    this.orderLines = new OrderLinesRepository(
      this.orderLinesRepository,
      this._loggerService,
      this._exceptionsService,
    );
    this.orderStatus = new OrderStatusRepository(
      this.orderStatusRepository,
      this._loggerService,
      this._exceptionsService,
    );
    this.shippingMethods = new ShippingMethodsRepository(
      this.shippingMethodsRepository,
      this._loggerService,
      this._exceptionsService,
    );
    this.shopOrders = new ShopOrdersRepository(
      this.shopOrdersRepository,
      this._loggerService,
      this._exceptionsService,
    );
    this.shoppingCarts = new ShoppingCartsRepository(
      this.shoppingCartsRepository,
      this._loggerService,
      this._exceptionsService,
    );

    // Shared

    this.productCategories = new ProductCategoriesRepository(
      this.productCategoriesRepository,
      this._loggerService,
      this._exceptionsService,
    );
    this.productConfigurations = new ProductConfigurationsRepository(
      this.productConfigurationsRepository,
      this._loggerService,
      this._exceptionsService,
    );
    this.productPromotions = new ProductPromotionsRepository(
      this.productPromotionsRepository,
      this._loggerService,
      this._exceptionsService,
    );

    this.productTags = new ProductTagsRepository(
      this.productTagsRepository,
      this._loggerService,
      this._exceptionsService,
    );
    this.shoppingCartProductItems = new ShoppingCartProductItemsRepository(
      this.shoppingCartProductItemsRepository,
      this._loggerService,
      this._exceptionsService,
    );
    this.userAddresses = new UserAddressesRepository(
      this.userAddressesRepository,
      this._loggerService,
      this._exceptionsService,
    );
  }
}
