import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import { Repository } from 'typeorm';
import { ShoppingCart } from './postgresql/entities/ShoppingCart.entity';
import { ShoppingCartsPostgresRepository } from './postgresql/repositories/shopping-carts.repository';
import { IShoppingCartsDataSourceService } from 'src/shopping-carts/domain/abstracts/services/shopping-carts-datasource.abstract.service';

@Injectable()
export class ShoppingCartsDataService
  implements IShoppingCartsDataSourceService, OnApplicationBootstrap
{
  shoppingCarts: ShoppingCartsPostgresRepository<ShoppingCart>;

  constructor(
    @InjectRepository(ShoppingCart)
    private shoppingCartsPostgresRepository: Repository<ShoppingCart>,
    private _loggerService: ILoggerService,
    private _exceptionsService: IExceptionsService,
  ) {}

  onApplicationBootstrap() {
    this.shoppingCarts = new ShoppingCartsPostgresRepository(
      this.shoppingCartsPostgresRepository,
      this._loggerService,
      this._exceptionsService,
      this.constructor.name,
      'shopping_cart',
    );
  }
}
