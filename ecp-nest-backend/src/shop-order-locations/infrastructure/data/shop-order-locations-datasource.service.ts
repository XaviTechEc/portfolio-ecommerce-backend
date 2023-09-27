import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ShopOrderLocation } from './postgresql/entities/ShopOrderLocation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import { Repository } from 'typeorm';
import { ShopOrderLocationsRepository } from './postgresql/repositories/shop-order-location.repository';
import { IShopOrderLocationsDataSourceService } from 'src/shop-order-locations/domain/abstracts/services/shop-order-locations-datasource.abstract.service';

@Injectable()
export class ShopOrderLocationsDataService
  implements IShopOrderLocationsDataSourceService, OnApplicationBootstrap
{
  shopOrderLocations: ShopOrderLocationsRepository;

  constructor(
    @InjectRepository(ShopOrderLocation)
    private shopOrderLocationsRepository: Repository<ShopOrderLocation>,
    private _loggerService: ILoggerService,
    private _exceptionsService: IExceptionsService,
  ) {}

  onApplicationBootstrap() {
    this.shopOrderLocations = new ShopOrderLocationsRepository(
      this.shopOrderLocationsRepository,
      this._loggerService,
      this._exceptionsService,
    );
  }
}
