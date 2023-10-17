import { Module } from '@nestjs/common';
import { AddressesModule } from './addresses/addresses.module';
import { AuthModule } from './auth/auth.module';
import { BillboardsModule } from './billboard/billboards.module';
import { CategoriesModule } from './categories/categories.module';
import { CategoryPromotionsModule } from './category-promotions/category-promotions.module';
import { CommentsModule } from './comments/comments.module';
import { CommonModule } from './common/common.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { FilesModule } from './files/files.module';
import { ImagesModule } from './images/images.module';
import { OrderLinesModule } from './order-lines/order-lines.module';
import { OrderStatusModule } from './order-status/order-status.module';
import { PaymentMethodsModule } from './payment-methods/payment-methods.module';
import { ProductCategoriesModule } from './product-categories/product-categories.module';
import { ProductConfigurationsModule } from './product-configurations/product-configurations.module';
import { ProductItemsModule } from './product-items/product-items.module';
import { ProductPromotionsModule } from './product-promotions/product-promotions.module';
import { ProductTagsModule } from './product-tags/product-tags.module';
import { ProductsModule } from './products/products.module';
import { PromotionsModule } from './promotions/promotions.module';
import { ReviewsModule } from './reviews/reviews.module';
import { SeasonsModule } from './seasons/seasons.module';
import { ShippingMethodsModule } from './shipping-methods/shipping-methods.module';
import { ShopOrderLocationsModule } from './shop-order-locations/shop-order-locations.module';
import { ShopOrdersModule } from './shop-orders/shop-orders.module';
import { ShoppingCartProductItemsModule } from './shopping-cart-product-items/shopping-cart-product-items.module';
import { ShoppingCartsModule } from './shopping-carts/shopping-carts.module';
import { StoresModule } from './stores/stores.module';
import { TagsModule } from './tags/tags.module';
import { UserAddressesModule } from './user-addresses/user-addresses.module';
import { UserPaymentMethodsModule } from './user-payment-methods/user-payment-methods.module';
import { UsersModule } from './users/users.module';
import { VariationOptionsModule } from './variation-options/variation-options.module';
import { VariationsModule } from './variations/variations.module';

@Module({
  imports: [
    AddressesModule,
    AuthModule,
    BillboardsModule,
    CategoriesModule,
    CategoryPromotionsModule,
    CommentsModule,
    CommonModule,
    ConfigurationModule,
    ImagesModule,
    OrderLinesModule,
    OrderStatusModule,
    PaymentMethodsModule,
    ProductCategoriesModule,
    ProductConfigurationsModule,
    ProductItemsModule,
    ProductPromotionsModule,
    ProductTagsModule,
    ProductsModule,
    PromotionsModule,
    ReviewsModule,
    SeasonsModule,
    ShippingMethodsModule,
    ShopOrderLocationsModule,
    ShopOrdersModule,
    ShoppingCartProductItemsModule,
    ShoppingCartsModule,
    StoresModule,
    TagsModule,
    UserAddressesModule,
    UserPaymentMethodsModule,
    UsersModule,
    VariationOptionsModule,
    VariationsModule,
    FilesModule,
  ],
})
export class AppModule {}
