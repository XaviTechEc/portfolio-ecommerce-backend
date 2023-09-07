import { Module } from '@nestjs/common';
import { UseCasesModule } from 'src/use-cases/use-cases.module';
import {
  AddressResolver,
  CategoryPromotionResolver,
  CategoryResolver,
  CountryResolver,
  ImageResolver,
  LocationResolver,
  OrderLineResolver,
  OrderStatusResolver,
  PaymentMethodResolver,
  ProductCategoryResolver,
  ProductConfigurationResolver,
  ProductItemResolver,
  ProductPromotionResolver,
  ProductResolver,
  ProductTagResolver,
  PromotionResolver,
  ReviewResolver,
  SeasonResolver,
  ShippingMethodResolver,
  ShopOrderLocationResolver,
  ShopOrderResolver,
  ShoppingCartProductItemResolver,
  ShoppingCartResolver,
  TagResolver,
  UserAddressResolver,
  UserPaymentMethodResolver,
  UserResolver,
  VariationOptionResolver,
  VariationResolver,
} from './resolvers';

@Module({
  imports: [UseCasesModule],
  controllers: [],
  providers: [
    AddressResolver,
    CountryResolver,
    LocationResolver,
    OrderLineResolver,
    OrderStatusResolver,
    ShippingMethodResolver,
    ShopOrderResolver,
    ShoppingCartResolver,
    CategoryResolver,
    ImageResolver,
    PaymentMethodResolver,
    ProductItemResolver,
    ProductResolver,
    PromotionResolver,
    ReviewResolver,
    SeasonResolver,
    CategoryPromotionResolver,
    ProductCategoryResolver,
    ProductConfigurationResolver,
    ProductPromotionResolver,
    ProductTagResolver,
    ShopOrderLocationResolver,
    ShoppingCartProductItemResolver,
    UserAddressResolver,
    UserPaymentMethodResolver,
    TagResolver,
    UserResolver,
    VariationOptionResolver,
    VariationResolver,
  ],
})
export class InterfaceAdaptersModule {}
