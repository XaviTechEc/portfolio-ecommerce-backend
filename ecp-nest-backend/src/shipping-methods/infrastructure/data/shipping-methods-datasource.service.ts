import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExceptionsService } from 'src/common/infrastructure/exceptions/exceptions.service';
import { MyLoggerService } from 'src/common/infrastructure/logger/logger.service';
import { Repository } from 'typeorm';
import { ShippingMethod } from './postgresql/entities/ShippingMethod.entity';
import { ShippingMethodsRepository } from './postgresql/repositories/shipping-methods.repository';
import { IShippingMethodsDataSourceService } from 'src/shipping-methods/domain/abstracts/services/shipping-methods-datasource.abstract.service';

@Injectable()
export class ShippingMethodsDataService
  implements IShippingMethodsDataSourceService, OnApplicationBootstrap
{
  shippingMethods: ShippingMethodsRepository;

  constructor(
    @InjectRepository(ShippingMethod)
    private shippingMethodsRepository: Repository<ShippingMethod>,
    private _loggerService: MyLoggerService,
    private _exceptionsService: ExceptionsService,
  ) {}

  onApplicationBootstrap() {
    this.shippingMethods = new ShippingMethodsRepository(
      this.shippingMethodsRepository,
      this._loggerService,
      this._exceptionsService,
    );
  }
}
