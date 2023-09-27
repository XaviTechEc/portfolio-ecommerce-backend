import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import { Repository } from 'typeorm';
import { ShoppingCartProductItem } from './postgresql/entities/ShoppingCartProductItem.entity';
import { ShoppingCartProductItemsRepository } from './postgresql/repositories/shopping-cart-product-item.repository';
import { IShoppingCartProductItemsDataSourceService } from 'src/shopping-cart-product-items/domain/abstracts/services/shopping-cart-product-items-datasource.abstract.service';

@Injectable()
export class ShoppingCartProductItemsDataService
  implements IShoppingCartProductItemsDataSourceService, OnApplicationBootstrap
{
  shoppingCartProductItems: ShoppingCartProductItemsRepository;
  constructor(
    @InjectRepository(ShoppingCartProductItem)
    private shoppingCartProductItemsRepository: Repository<ShoppingCartProductItem>,
    private _loggerService: ILoggerService,
    private _exceptionsService: IExceptionsService,
  ) {}
  onApplicationBootstrap() {
    this.shoppingCartProductItems = new ShoppingCartProductItemsRepository(
      this.shoppingCartProductItemsRepository,
      this._loggerService,
      this._exceptionsService,
    );
  }
}
