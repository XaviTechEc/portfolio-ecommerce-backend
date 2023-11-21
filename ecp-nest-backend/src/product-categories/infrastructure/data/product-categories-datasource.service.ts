import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import { Repository } from 'typeorm';
import { ProductCategory } from './postgresql/entities/ProductCategory.entity';
import { ProductCategoriesPostgresRepository } from './postgresql/repositories/product-category.repository';
import { IProductCategoriesDataSourceService } from 'src/product-categories/domain/abstracts/services/product-categories-datasource.abstract.service';

@Injectable()
export class ProductCategoriesDataService
  implements IProductCategoriesDataSourceService, OnApplicationBootstrap
{
  productCategories: ProductCategoriesPostgresRepository<ProductCategory>;

  constructor(
    @InjectRepository(ProductCategory)
    private productCategoriesPostgresRepository: Repository<ProductCategory>,
    private _loggerService: ILoggerService,
    private _exceptionsService: IExceptionsService,
  ) {}

  onApplicationBootstrap() {
    this.productCategories = new ProductCategoriesPostgresRepository(
      this.productCategoriesPostgresRepository,
      this._loggerService,
      this._exceptionsService,
      this.constructor.name,
      'product_category',
    );
  }
}
