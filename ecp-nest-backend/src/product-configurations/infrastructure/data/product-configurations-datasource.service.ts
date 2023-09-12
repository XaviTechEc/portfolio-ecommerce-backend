import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExceptionsService } from 'src/common/infrastructure/exceptions/exceptions.service';
import { MyLoggerService } from 'src/common/infrastructure/logger/logger.service';
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
    private _loggerService: MyLoggerService,
    private _exceptionsService: ExceptionsService,
  ) {}

  onApplicationBootstrap() {
    this.productConfigurations = new ProductConfigurationsRepository(
      this.productConfigurationsRepository,
      this._loggerService,
      this._exceptionsService,
    );
  }
}
