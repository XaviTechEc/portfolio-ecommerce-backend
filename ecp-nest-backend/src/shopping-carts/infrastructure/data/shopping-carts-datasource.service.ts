import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExceptionsService } from 'src/common/infrastructure/exceptions/exceptions.service';
import { MyLoggerService } from 'src/common/infrastructure/logger/logger.service';
import { Repository } from 'typeorm';
import { ShoppingCart } from './postgresql/entities/ShoppingCart.entity';
import { ShoppingCartsRepository } from './postgresql/repositories/shopping-carts.repository';
import { IShoppingCartsDataSourceService } from 'src/shopping-carts/domain/abstracts/services/shopping-carts-datasource.abstract.service';

@Injectable()
export class ShoppingCartsDataService
  implements IShoppingCartsDataSourceService, OnApplicationBootstrap
{
  shoppingCarts: ShoppingCartsRepository;

  constructor(
    @InjectRepository(ShoppingCart)
    private shoppingCartsRepository: Repository<ShoppingCart>,
    private _loggerService: MyLoggerService,
    private _exceptionsService: ExceptionsService,
  ) {}

  onApplicationBootstrap() {
    this.shoppingCarts = new ShoppingCartsRepository(
      this.shoppingCartsRepository,
      this._loggerService,
      this._exceptionsService,
    );
  }
}
