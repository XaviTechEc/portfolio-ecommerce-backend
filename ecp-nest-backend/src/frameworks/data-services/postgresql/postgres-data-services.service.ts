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
import { ReviewsRepository } from './typeorm/repositories/reviews/review.repository';
import { CountriesRepository } from './typeorm/repositories/addresses/countries.repository';
import { LocationsRepository } from './typeorm/repositories/addresses/locations.repository';
import { OrderLinesRepository } from './typeorm/repositories/cart/order-lines.repository';
import { OrderStatusRepository } from './typeorm/repositories/cart/order-status.repository';
import { ShippingMethodsRepository } from './typeorm/repositories/cart/shipping-methods.repository';
import { ShopOrdersRepository } from './typeorm/repositories/cart/shop-orders.repository';
import { ShoppingCartsRepository } from './typeorm/repositories/cart/shopping-carts.repository';
import { CategoriesRepository } from './typeorm/repositories/categories/categories.repository';
import { CommentsRepository } from './typeorm/repositories/comments/comments.repository';
import { PaymentMethodsRepository } from './typeorm/repositories/payments/payment-methods.repository';
import { UserPaymentMethodsRepository } from './typeorm/repositories/shared/user-payment-methods.repository';
import { ProductItemsRepository } from './typeorm/repositories/products/product-items.repository';
import { ProductsRepository } from './typeorm/repositories/products/products.repository';
import { PromotionsRepository } from './typeorm/repositories/promotions/promotions.repository';
import { PostgresGenericRepository } from './postgres-generic-repository';
import { SeasonsRepository } from './typeorm/repositories/seasons/seasons.repository';
import { TagsRepository } from './typeorm/repositories/tags/tags.repository';
import { VariationOptionsRepository } from './typeorm/repositories/variations/variation-options.repository';
import { VariationsRepository } from './typeorm/repositories/variations/variations.repository';
import { UsersRepository } from './typeorm/repositories/users/users.repository';

@Injectable()
export class PostgresDataServices
  implements IDataSourcesService, OnApplicationBootstrap
{
  // Addresses
  addresses: AddressesRepository;
  // countries: CountriesRepository<Country>;
  // locations: LocationsRepository<Location>;

  // // Cart
  // orderLines: OrderLinesRepository<OrderLine>;
  // orderStatus: OrderStatusRepository<OrderStatus>;
  // shippingMethods: ShippingMethodsRepository<ShippingMethod>;
  // shopOrders: ShopOrdersRepository<ShopOrder>;
  // shoppingCarts: ShoppingCartsRepository<ShoppingCart>;

  // // Categories
  // categories: CategoriesRepository<Category>;

  // // Comments
  // comments: CommentsRepository<Comment>;

  // // Payments
  // paymentMethods: PaymentMethodsRepository<PaymentMethod>;
  // userPaymentMethods: UserPaymentMethodsRepository<UserPaymentMethod>;

  // // Products
  // productItems: ProductItemsRepository<ProductItem>;
  // products: ProductsRepository<Product>;

  // // Promotions
  // promotions: PromotionsRepository<Promotion>;

  // // Reviews
  // reviews: ReviewsRepository<Review>;

  // // Seasons
  // seasons: SeasonsRepository<Season>;

  // // Shared
  // categoryPromotions: PostgresGenericRepository<CategoryPromotion>;
  // productCategories: PostgresGenericRepository<ProductCategory>;
  // productConfigurations: PostgresGenericRepository<ProductConfiguration>;
  // productPromotions: PostgresGenericRepository<ProductPromotion>;
  // productTags: PostgresGenericRepository<ProductTag>;
  // shoppingCartProductItems: PostgresGenericRepository<ShoppingCartProductItem>;
  // userAddresses: PostgresGenericRepository<UserAddress>;

  // // Tags
  // tags: TagsRepository<Tag>;

  // // Users
  // users: UsersRepository<User>;

  // // Variations
  // variations: VariationsRepository<Variation>;
  // variationOptions: VariationOptionsRepository<VariationOption>;

  constructor(
    // Addresses
    @InjectRepository(Address)
    private addressesRepository: Repository<Address>, // @InjectRepository(Country)
  ) // private countriesRepository: Repository<Country>,
  // @InjectRepository(Location)
  // private locationsRepository: Repository<Location>,

  // // Cart
  // @InjectRepository(OrderLine)
  // private orderLinesRepository: Repository<OrderLine>,
  // @InjectRepository(OrderStatus)
  // private orderStatusRepository: Repository<OrderStatus>,
  // @InjectRepository(ShippingMethod)
  // private shippingMethodsRepository: Repository<ShippingMethod>,
  // @InjectRepository(ShopOrder)
  // private shopOrdersRepository: Repository<ShopOrder>,
  // @InjectRepository(ShoppingCart)
  // private shoppingCartsRepository: Repository<ShoppingCart>,

  // // Categories
  // @InjectRepository(Category)
  // private categoriesRepository: Repository<Category>,

  // // Comments
  // @InjectRepository(Comment)
  // private commentsRepository: Repository<Comment>,

  // // Payments
  // @InjectRepository(PaymentMethod)
  // private paymentMethodsRepository: Repository<PaymentMethod>,
  // @InjectRepository(UserPaymentMethod)
  // private userPaymentMethodsRepository: Repository<UserPaymentMethod>,

  // // Products
  // @InjectRepository(ProductItem)
  // private productItemsRepository: Repository<ProductItem>,
  // @InjectRepository(Product)
  // private productsRepository: Repository<Product>,

  // // Promotions
  // @InjectRepository(Promotion)
  // private promotionsRepository: Repository<Promotion>,

  // // Reviews
  // @InjectRepository(Review)
  // private reviewsRepository: Repository<Review>,

  // // Seasons
  // @InjectRepository(Season)
  // private seasonsRepository: Repository<Season>,

  // // Shared
  // @InjectRepository(CategoryPromotion)
  // private categoryPromotionsRepository: Repository<CategoryPromotion>,
  // @InjectRepository(ProductCategory)
  // private productCategoriesRepository: Repository<ProductCategory>,
  // @InjectRepository(ProductConfiguration)
  // private productConfigurationsRepository: Repository<ProductConfiguration>,
  // @InjectRepository(ProductPromotion)
  // private productPromotionsRepository: Repository<ProductPromotion>,
  // @InjectRepository(ProductTag)
  // private productTagsRepository: Repository<ProductTag>,
  // @InjectRepository(ShoppingCartProductItem)
  // private shoppingCartProductItemsRepository: Repository<ShoppingCartProductItem>,
  // @InjectRepository(UserAddress)
  // private userAddressesRepository: Repository<UserAddress>,

  // // Tags
  // @InjectRepository(Tag)
  // private tagsRepository: Repository<Tag>,

  // // Users
  // @InjectRepository(User)
  // private usersRepository: Repository<User>,

  // // Variations
  // @InjectRepository(Variation)
  // private variationsRepository: Repository<Variation>,
  // @InjectRepository(VariationOption)
  // private variationOptionsRepository: Repository<VariationOption>,
  {}

  onApplicationBootstrap() {
    // Addresses
    this.addresses = new AddressesRepository(this.addressesRepository);
    // this.countries = new CountriesRepository<Country>(this.countriesRepository);
    // this.locations = new LocationsRepository<Location>(
    //   this.locationsRepository,
    // );

    // // Cart
    // this.orderLines = new OrderLinesRepository<OrderLine>(
    //   this.orderLinesRepository,
    // );
    // this.orderStatus = new OrderStatusRepository<OrderStatus>(
    //   this.orderStatusRepository,
    // );
    // this.shippingMethods = new ShippingMethodsRepository<ShippingMethod>(
    //   this.shippingMethodsRepository,
    // );
    // this.shopOrders = new ShopOrdersRepository<ShopOrder>(
    //   this.shopOrdersRepository,
    // );
    // this.shoppingCarts = new ShoppingCartsRepository<ShoppingCart>(
    //   this.shoppingCartsRepository,
    // );

    // // Categories
    // this.categories = new CategoriesRepository<Category>(
    //   this.categoriesRepository,
    // );

    // // Comments
    // this.comments = new CommentsRepository<Comment>(this.commentsRepository);

    // // Payments
    // this.paymentMethods = new PaymentMethodsRepository<PaymentMethod>(
    //   this.paymentMethodsRepository,
    // );
    // this.userPaymentMethods =
    //   new UserPaymentMethodsRepository<UserPaymentMethod>(
    //     this.userPaymentMethodsRepository,
    //   );

    // // Products
    // this.productItems = new ProductItemsRepository<ProductItem>(
    //   this.productItemsRepository,
    // );
    // this.products = new ProductsRepository<Product>(this.productsRepository);

    // // Promotions
    // this.promotions = new PromotionsRepository<Promotion>(
    //   this.promotionsRepository,
    // );

    // // Reviews
    // this.reviews = new ReviewsRepository<Review>(this.reviewsRepository);

    // // Seasons
    // this.seasons = new SeasonsRepository<Season>(this.seasonsRepository);

    // // Shared
    // this.categoryPromotions = new PostgresGenericRepository<CategoryPromotion>(
    //   this.categoryPromotionsRepository,
    // );
    // this.productCategories = new PostgresGenericRepository<ProductCategory>(
    //   this.productCategoriesRepository,
    // );
    // this.productConfigurations =
    //   new PostgresGenericRepository<ProductConfiguration>(
    //     this.productConfigurationsRepository,
    //   );
    // this.productPromotions = new PostgresGenericRepository<ProductPromotion>(
    //   this.productPromotionsRepository,
    // );

    // this.productTags = new PostgresGenericRepository<ProductTag>(
    //   this.productTagsRepository,
    // );
    // this.shoppingCartProductItems =
    //   new PostgresGenericRepository<ShoppingCartProductItem>(
    //     this.shoppingCartProductItemsRepository,
    //   );
    // this.userAddresses = new PostgresGenericRepository<UserAddress>(
    //   this.userAddressesRepository,
    // );

    // // Tags
    // this.tags = new TagsRepository<Tag>(this.tagsRepository);

    // // Users
    // this.users = new UsersRepository<User>(this.usersRepository);

    // // Variations
    // this.variations = new VariationsRepository<Variation>(
    //   this.variationsRepository,
    // );

    // this.variationOptions = new VariationOptionsRepository<VariationOption>(
    //   this.variationOptionsRepository,
    // );
  }
}
