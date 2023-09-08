import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IDataSourcesService } from 'src/core/abstracts/services/data-services/data-sources.service';
import { PostgresDataServices } from './postgres-data-services.service';
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
import { LoggerModule } from 'src/infrastructure/logger/logger.module';
import { ExceptionModule } from 'src/infrastructure/exceptions/exceptions.module';
import { JwtModule } from 'src/services/jwt/jwt.module';
import { HashingModule } from '../../../services/hashing/hashing.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
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
    ]),

    // Other Modules
    LoggerModule,
    ExceptionModule,
    JwtModule,
    HashingModule,
  ],
  providers: [
    {
      provide: IDataSourcesService,
      useClass: PostgresDataServices,
    },
  ],
  exports: [IDataSourcesService],
})
export class PostgresDataServiceModule {}
