import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ShopOrderLocation } from './postgresql/entities/ShopOrderLocation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import { Repository } from 'typeorm';
import { ShopOrderLocationsPostgresRepository } from './postgresql/repositories/shop-order-location.repository';
import { IShopOrderLocationsDataSourceService } from 'src/shop-order-locations/domain/abstracts/services/shop-order-locations-datasource.abstract.service';

@Injectable()
export class ShopOrderLocationsDataService
  implements IShopOrderLocationsDataSourceService, OnApplicationBootstrap
{
  shopOrderLocations: ShopOrderLocationsPostgresRepository<ShopOrderLocation>;

  constructor(
    @InjectRepository(ShopOrderLocation)
    private shopOrderLocationsPostgresRepository: Repository<ShopOrderLocation>,
    private _loggerService: ILoggerService,
    private _exceptionsService: IExceptionsService,
  ) {}

  onApplicationBootstrap() {
    this.shopOrderLocations = new ShopOrderLocationsPostgresRepository(
      this.shopOrderLocationsPostgresRepository,
      this._loggerService,
      this._exceptionsService,
      this.constructor.name,
      'shop_order_location',
    );
  }
}
