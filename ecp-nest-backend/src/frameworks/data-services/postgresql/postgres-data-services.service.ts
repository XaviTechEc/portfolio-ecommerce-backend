import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';

import { Repository } from 'typeorm';
import {
  Address,
  Category,
  CategoryPromotion,
  Comment,
  Country,
  Image,
  Location,
  OrderLine,
  OrderStatus,
  PaymentMethod,
  Product,
  ProductCategory,
  ProductConfiguration,
  ProductItem,
  ProductPromotion,
  ProductTag,
  Promotion,
  Review,
  Season,
  ShippingMethod,
  ShopOrder,
  ShoppingCart,
  ShoppingCartProductItem,
  Tag,
  User,
  UserAddress,
  UserPaymentMethod,
  Variation,
  VariationOption,
} from './typeorm/entities/outputs/entities';
import { AddressesRepository } from './typeorm/repositories/addresses/addresses.repository';
import { CountriesRepository } from './typeorm/repositories/addresses/countries.repository';
import { LocationsRepository } from './typeorm/repositories/addresses/locations.repository';
import { OrderLinesRepository } from './typeorm/repositories/cart/order-lines.repository';
import { OrderStatusRepository } from './typeorm/repositories/cart/order-status.repository';
import { ShippingMethodsRepository } from './typeorm/repositories/cart/shipping-methods.repository';
import { ShopOrdersRepository } from './typeorm/repositories/cart/shop-orders.repository';
import { ShoppingCartsRepository } from './typeorm/repositories/cart/shopping-carts.repository';
import { CategoriesRepository } from './typeorm/repositories/categories/categories.repository';
import { CommentsRepository } from './typeorm/repositories/comments/comments.repository';
import { ImagesRepository } from './typeorm/repositories/images/images.repository';
import { PaymentMethodsRepository } from './typeorm/repositories/payments/payment-methods.repository';
import { ProductItemsRepository } from './typeorm/repositories/products/product-items.repository';
import { ProductsRepository } from './typeorm/repositories/products/products.repository';
import { PromotionsRepository } from './typeorm/repositories/promotions/promotions.repository';
import { ReviewsRepository } from './typeorm/repositories/reviews/review.repository';
import { SeasonsRepository } from './typeorm/repositories/seasons/seasons.repository';
import {
  CategoryPromotionsRepository,
  ProductCategoriesRepository,
  ProductConfigurationsRepository,
  ProductPromotionsRepository,
  ProductTagsRepository,
  ShopOrderLocationsRepository,
  ShoppingCartProductItemsRepository,
  UserAddressesRepository,
} from './typeorm/repositories/shared';
import { UserPaymentMethodsRepository } from './typeorm/repositories/shared/user-payment-methods.repository';
import { TagsRepository } from './typeorm/repositories/tags/tags.repository';
import { UsersRepository } from './typeorm/repositories/users/users.repository';
import { VariationOptionsRepository } from './typeorm/repositories/variations/variation-options.repository';
import { VariationsRepository } from './typeorm/repositories/variations/variations.repository';
import { LoggerService } from 'src/infrastructure/logger/logger.service';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';

@Injectable()
export class PostgresDataServices
  implements IDataSourcesService, OnApplicationBootstrap
{
  // Addresses
  addresses: AddressesRepository;
  countries: CountriesRepository;
  locations: LocationsRepository;

  // Cart
  orderLines: OrderLinesRepository;
  orderStatus: OrderStatusRepository;
  shippingMethods: ShippingMethodsRepository;
  shopOrders: ShopOrdersRepository;
  shoppingCarts: ShoppingCartsRepository;

  // Categories
  categories: CategoriesRepository;

  // Comments
  comments: CommentsRepository;

  Images;
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

  // Shared
  categoryPromotions: CategoryPromotionsRepository;
  productCategories: ProductCategoriesRepository;
  productConfigurations: ProductConfigurationsRepository;
  productPromotions: ProductPromotionsRepository;
  productTags: ProductTagsRepository;
  shopOrderLocations: ShopOrderLocationsRepository;
  shoppingCartProductItems: ShoppingCartProductItemsRepository;
  userAddresses: UserAddressesRepository;

  // Tags
  tags: TagsRepository;

  // Users
  users: UsersRepository;

  // Variations
  variations: VariationsRepository;
  variationOptions: VariationOptionsRepository;

  constructor(
    // Addresses
    @InjectRepository(Address)
    private addressesRepository: Repository<Address>,
    @InjectRepository(Country)
    private countriesRepository: Repository<Country>,
    @InjectRepository(Location)
    private locationsRepository: Repository<Location>,

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

    // Categories
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,

    // Comments
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,

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

    // Shared
    @InjectRepository(CategoryPromotion)
    private categoryPromotionsRepository: Repository<CategoryPromotion>,
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

    private _loggerService: LoggerService,
    private _exceptionsService: ExceptionsService,
  ) {}

  onApplicationBootstrap() {
    // Addresses
    this.addresses = new AddressesRepository(
      this.addressesRepository,
      this._loggerService,
      this._exceptionsService,
    );
    this.countries = new CountriesRepository(
      this.countriesRepository,
      this._loggerService,
      this._exceptionsService,
    );
    this.locations = new LocationsRepository(
      this.locationsRepository,
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

    // Categories
    this.categories = new CategoriesRepository(this.categoriesRepository);

    // Comments
    this.comments = new CommentsRepository(this.commentsRepository);

    // Images
    this.images = new ImagesRepository(this.imagesRepository);

    // Payments
    this.paymentMethods = new PaymentMethodsRepository(
      this.paymentMethodsRepository,
    );
    this.userPaymentMethods = new UserPaymentMethodsRepository(
      this.userPaymentMethodsRepository,
    );

    // Products
    this.productItems = new ProductItemsRepository(this.productItemsRepository);
    this.products = new ProductsRepository(this.productsRepository);

    // Promotions
    this.promotions = new PromotionsRepository(this.promotionsRepository);

    // Reviews
    this.reviews = new ReviewsRepository(this.reviewsRepository);

    // Seasons
    this.seasons = new SeasonsRepository(this.seasonsRepository);

    // Shared
    this.categoryPromotions = new CategoryPromotionsRepository(
      this.categoryPromotionsRepository,
    );
    this.productCategories = new ProductCategoriesRepository(
      this.productCategoriesRepository,
    );
    this.productConfigurations = new ProductConfigurationsRepository(
      this.productConfigurationsRepository,
    );
    this.productPromotions = new ProductPromotionsRepository(
      this.productPromotionsRepository,
    );

    this.productTags = new ProductTagsRepository(this.productTagsRepository);
    this.shoppingCartProductItems = new ShoppingCartProductItemsRepository(
      this.shoppingCartProductItemsRepository,
    );
    this.userAddresses = new UserAddressesRepository(
      this.userAddressesRepository,
    );

    // Tags
    this.tags = new TagsRepository(this.tagsRepository);

    // Users
    this.users = new UsersRepository(this.usersRepository);

    // Variations
    this.variations = new VariationsRepository(this.variationsRepository);

    this.variationOptions = new VariationOptionsRepository(
      this.variationOptionsRepository,
    );
  }
}
