import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExceptionsService } from 'src/common/infrastructure/exceptions/exceptions.service';
import { MyLoggerService } from 'src/common/infrastructure/logger/logger.service';
import { Repository } from 'typeorm';
import { ProductCategory } from './postgresql/entities/ProductCategory.entity';
import { ProductCategoriesRepository } from './postgresql/repositories/product-category.repository';
import { IProductCategoriesDataSourceService } from 'src/product-categories/domain/abstracts/services/product-categories-datasource.abstract.service';

@Injectable()
export class ProductCategoriesDataService
  implements IProductCategoriesDataSourceService, OnApplicationBootstrap
{
  productCategories: ProductCategoriesRepository;

  constructor(
    @InjectRepository(ProductCategory)
    private productCategoriesRepository: Repository<ProductCategory>,
    private _loggerService: MyLoggerService,
    private _exceptionsService: ExceptionsService,
  ) {}

  onApplicationBootstrap() {
    this.productCategories = new ProductCategoriesRepository(
      this.productCategoriesRepository,
      this._loggerService,
      this._exceptionsService,
    );
  }
}
