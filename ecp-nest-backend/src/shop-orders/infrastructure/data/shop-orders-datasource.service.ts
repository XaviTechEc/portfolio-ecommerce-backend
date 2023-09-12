import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExceptionsService } from 'src/common/infrastructure/exceptions/exceptions.service';
import { MyLoggerService } from 'src/common/infrastructure/logger/logger.service';
import { Repository } from 'typeorm';
import { ShopOrder } from './postgresql/entities/ShopOrder.entity';
import { ShopOrdersRepository } from './postgresql/repositories/shop-orders.repository';
import { IShopOrdersDataSourceService } from 'src/shop-orders/domain/abstracts/services/shop-orders-datasource.abstract.service';

@Injectable()
export class ShopOrdersDataService
  implements IShopOrdersDataSourceService, OnApplicationBootstrap
{
  shopOrders: ShopOrdersRepository;
  constructor(
    @InjectRepository(ShopOrder)
    private shopOrdersRepository: Repository<ShopOrder>,
    private _loggerService: MyLoggerService,
    private _exceptionsService: ExceptionsService,
  ) {}

  onApplicationBootstrap() {
    this.shopOrders = new ShopOrdersRepository(
      this.shopOrdersRepository,
      this._loggerService,
      this._exceptionsService,
    );
  }
}
