import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import { Repository } from 'typeorm';
import { ShippingMethod } from './postgresql/entities/ShippingMethod.entity';
import { ShippingMethodsPostgresRepository } from './postgresql/repositories/shipping-methods.repository';
import { IShippingMethodsDataSourceService } from 'src/shipping-methods/domain/abstracts/services/shipping-methods-datasource.abstract.service';

@Injectable()
export class ShippingMethodsDataService
  implements IShippingMethodsDataSourceService, OnApplicationBootstrap
{
  shippingMethods: ShippingMethodsPostgresRepository<ShippingMethod>;

  constructor(
    @InjectRepository(ShippingMethod)
    private shippingMethodsPostgresRepository: Repository<ShippingMethod>,
    private _loggerService: ILoggerService,
    private _exceptionsService: IExceptionsService,
  ) {}

  onApplicationBootstrap() {
    this.shippingMethods = new ShippingMethodsPostgresRepository(
      this.shippingMethodsPostgresRepository,
      this._loggerService,
      this._exceptionsService,
      this.constructor.name,
      'shipping_method',
    );
  }
}
