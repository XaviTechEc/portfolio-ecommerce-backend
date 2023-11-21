import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import { Repository } from 'typeorm';
import { ProductItem } from './postgresql/entities/ProductItem.entity';
import { ProductItemsPostgresRepository } from './postgresql/repositories/product-items.repository';
import { IProductItemsDataSourceService } from 'src/product-items/domain/abstracts/services/product-items-datasource.abstract.service';

@Injectable()
export class ProductItemsDataService
  implements IProductItemsDataSourceService, OnApplicationBootstrap
{
  productItems: ProductItemsPostgresRepository<ProductItem>;

  constructor(
    @InjectRepository(ProductItem)
    private productItemsPostgresRepository: Repository<ProductItem>,
    private _loggerService: ILoggerService,
    private _exceptionsService: IExceptionsService,
  ) {}

  onApplicationBootstrap() {
    this.productItems = new ProductItemsPostgresRepository(
      this.productItemsPostgresRepository,
      this._loggerService,
      this._exceptionsService,
      this.constructor.name,
      'product_item',
    );
  }
}
