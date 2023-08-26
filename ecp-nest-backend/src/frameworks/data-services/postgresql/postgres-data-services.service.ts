import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';

import {
  IAddress,
  ICategory,
  IComment,
  ICountry,
  ILocation,
  IOrderLine,
  IOrderStatus,
  IPaymentMethod,
  IProduct,
  IProductItem,
  IPromotion,
  IReview,
  ISeason,
  IShippingMethod,
  IShopOrder,
  IShoppingCart,
  ITag,
  IUserPaymentMethod,
  IVariation,
  IVariationOption,
} from 'src/core/entities';
import { Repository } from 'typeorm';
import { PostgresGenericRepository } from './postgres-generic-repository';
import { User } from './typeorm/entities/outputs/entities';

@Injectable()
export class PostgresDataServices
  implements IDataSourcesService, OnApplicationBootstrap
{
  users: PostgresGenericRepository<User>;
  addresses: PostgresGenericRepository<IAddress>;
  countries: PostgresGenericRepository<ICountry>;
  locations: PostgresGenericRepository<ILocation>;
  orderLines: PostgresGenericRepository<IOrderLine>;
  orderStatus: PostgresGenericRepository<IOrderStatus>;
  shippingMethods: PostgresGenericRepository<IShippingMethod>;
  shopOrders: PostgresGenericRepository<IShopOrder>;
  shoppingCarts: PostgresGenericRepository<IShoppingCart>;
  categories: PostgresGenericRepository<ICategory>;
  comments: PostgresGenericRepository<IComment>;
  paymentMethods: PostgresGenericRepository<IPaymentMethod>;
  userPaymentMethods: PostgresGenericRepository<IUserPaymentMethod>;
  products: PostgresGenericRepository<IProduct>;
  productItems: PostgresGenericRepository<IProductItem>;
  promotions: PostgresGenericRepository<IPromotion>;
  reviews: PostgresGenericRepository<IReview>;
  seasons: PostgresGenericRepository<ISeason>;
  tags: PostgresGenericRepository<ITag>;
  variationOptions: PostgresGenericRepository<IVariationOption>;
  variations: PostgresGenericRepository<IVariation>;

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  onApplicationBootstrap() {
    this.users = new PostgresGenericRepository<User>(this.userRepository);
  }
}
