import { Module } from '@nestjs/common';

import { CommonModule } from './common/common.module';
import { DataServicesModule } from './services/data-services/data-services.module';

import { ConfigurationModule } from './configuration/configuration.module';
import { InterfaceAdaptersModule } from './interface-adapters/interface-adapters.module';
import { UseCasesModule } from './use-cases/use-cases.module';
import { FrameworksModule } from './frameworks/frameworks.module';
import { ExceptionModule } from './infrastructure/exceptions/exceptions.module';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { JwtModule } from './services/jwt/jwt.module';
import { HashingModule } from './services/hashing/hashing.module';
import { EncryptionModule } from './services/encryption/encryption.module';
import { AddressesModule } from './addresses/addresses.module';
import { CategoriesModule } from './categories/categories.module';
import { CategoryPromotionsModule } from './category-promotions/category-promotions.module';
import { CommentsModule } from './comments/comments.module';

import { ImagesModule } from './images/images.module';

import { OrderLinesModule } from './order-lines/order-lines.module';
import { OrderStatusModule } from './order-status/order-status.module';
import { PaymentMethodsModule } from './payment-methods/payment-methods.module';
import { ProductsModule } from './products/products.module';
import { CategoryProductsModule } from './category-products/category-products.module';
import { ProductConfigurationsModule } from './product-configurations/product-configurations.module';
import { ProductItemsModule } from './product-items/product-items.module';
import { ProductPromotionsModule } from './product-promotions/product-promotions.module';
import { ProductTagsModule } from './product-tags/product-tags.module';
import { PromotionsModule } from './promotions/promotions.module';
import { ReviewsModule } from './reviews/reviews.module';
import { SeasonsModule } from './seasons/seasons.module';
import { ShippingMethodsModule } from './shipping-methods/shipping-methods.module';
import { ShopOrdersModule } from './shop-orders/shop-orders.module';
import { ShoppingCartsModule } from './shopping-carts/shopping-carts.module';
import { ShoppingCartProductItemsModule } from './shopping-cart-product-items/shopping-cart-product-items.module';
import { TagsModule } from './tags/tags.module';
import { UsersModule } from './users/users.module';
import { UserAddressesModule } from './user-addresses/user-addresses.module';
import { UserPaymentMethodsModule } from './user-payment-methods/user-payment-methods.module';
import { VariationsModule } from './variations/variations.module';
import { VariationOptionsModule } from './variation-options/variation-options.module';
import { AuthModule } from './auth/auth.module';
import { ShopOrderLocationsModule } from './shop-order-locations/shop-order-locations.module';

@Module({
  imports: [
    CommonModule,
    ConfigurationModule,
    InterfaceAdaptersModule,
    DataServicesModule,
    JwtModule,
    HashingModule,
    EncryptionModule,
    UseCasesModule,
    FrameworksModule,
    ExceptionModule,
    LoggerModule,
    AddressesModule,
    CategoriesModule,
    CategoryPromotionsModule,
    CommentsModule,
    ImagesModule,
    OrderLinesModule,
    OrderStatusModule,
    PaymentMethodsModule,
    ProductsModule,
    CategoryProductsModule,
    ProductConfigurationsModule,
    ProductItemsModule,
    ProductPromotionsModule,
    ProductTagsModule,
    PromotionsModule,
    ReviewsModule,
    SeasonsModule,
    ShippingMethodsModule,
    ShopOrdersModule,
    ShoppingCartsModule,
    ShoppingCartProductItemsModule,
    TagsModule,
    UsersModule,
    UserAddressesModule,
    UserPaymentMethodsModule,
    VariationsModule,
    VariationOptionsModule,
    AuthModule,
    ShopOrderLocationsModule,
  ],
})
export class AppModule {}
