import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import { Repository } from 'typeorm';
import { ProductConfiguration } from './postgresql/entities/ProductConfiguration.entity';
import { ProductConfigurationsRepository } from './postgresql/repositories/product-configuration.repository';
import { IProductConfigurationDataSourceService } from 'src/product-configurations/domain/abstracts/services/product-configuration-datasource.abstract.service';

@Injectable()
export class ProductConfigurationDataService
  implements IProductConfigurationDataSourceService, OnApplicationBootstrap
{
  productConfigurations: ProductConfigurationsRepository;

  constructor(
    @InjectRepository(ProductConfiguration)
    private productConfigurationsRepository: Repository<ProductConfiguration>,
    private _loggerService: ILoggerService,
    private _exceptionsService: IExceptionsService,
  ) {}

  onApplicationBootstrap() {
    this.productConfigurations = new ProductConfigurationsRepository(
      this.productConfigurationsRepository,
      this._loggerService,
      this._exceptionsService,
    );
  }
}
