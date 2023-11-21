import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import { Repository } from 'typeorm';
import { ShoppingCartProductItem } from './postgresql/entities/ShoppingCartProductItem.entity';
import { ShoppingCartProductItemsPostgresRepository } from './postgresql/repositories/shopping-cart-product-item.repository';
import { IShoppingCartProductItemsDataSourceService } from 'src/shopping-cart-product-items/domain/abstracts/services/shopping-cart-product-items-datasource.abstract.service';

@Injectable()
export class ShoppingCartProductItemsDataService
  implements IShoppingCartProductItemsDataSourceService, OnApplicationBootstrap
{
  shoppingCartProductItems: ShoppingCartProductItemsPostgresRepository<ShoppingCartProductItem>;
  constructor(
    @InjectRepository(ShoppingCartProductItem)
    private shoppingCartProductItemsPostgresRepository: Repository<ShoppingCartProductItem>,
    private _loggerService: ILoggerService,
    private _exceptionsService: IExceptionsService,
  ) {}
  onApplicationBootstrap() {
    this.shoppingCartProductItems =
      new ShoppingCartProductItemsPostgresRepository(
        this.shoppingCartProductItemsPostgresRepository,
        this._loggerService,
        this._exceptionsService,
        this.constructor.name,
        'shopping_cart_product_item',
      );
  }
}
