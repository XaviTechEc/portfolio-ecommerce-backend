import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import { Repository } from 'typeorm';
import { ProductConfiguration } from './postgresql/entities/ProductConfiguration.entity';
import { ProductConfigurationsPostgresRepository } from './postgresql/repositories/product-configuration.repository';
import { IProductConfigurationsDataSourceService } from 'src/product-configurations/domain/abstracts/services/product-configurations-datasource.abstract.service';

@Injectable()
export class ProductConfigurationDataService
  implements IProductConfigurationsDataSourceService, OnApplicationBootstrap
{
  productConfigurations: ProductConfigurationsPostgresRepository<ProductConfiguration>;

  constructor(
    @InjectRepository(ProductConfiguration)
    private productConfigurationsPostgresRepository: Repository<ProductConfiguration>,
    private _loggerService: ILoggerService,
    private _exceptionsService: IExceptionsService,
  ) {}

  onApplicationBootstrap() {
    this.productConfigurations = new ProductConfigurationsPostgresRepository(
      this.productConfigurationsPostgresRepository,
      this._loggerService,
      this._exceptionsService,
      this.constructor.name,
      'product_configuration',
    );
  }
}
