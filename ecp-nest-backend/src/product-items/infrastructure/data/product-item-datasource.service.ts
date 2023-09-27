import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import { Repository } from 'typeorm';
import { ProductItem } from './postgresql/entities/ProductItem.entity';
import { ProductItemsRepository } from './postgresql/repositories/product-items.repository';
import { IProductItemsDataSourceService } from 'src/product-items/domain/abstracts/services/product-items-datasource.abstract.service';

@Injectable()
export class ProductItemsDataService
  implements IProductItemsDataSourceService, OnApplicationBootstrap
{
  productItems: ProductItemsRepository;

  constructor(
    @InjectRepository(ProductItem)
    private productItemsRepository: Repository<ProductItem>,
    private _loggerService: ILoggerService,
    private _exceptionsService: IExceptionsService,
  ) {}

  onApplicationBootstrap() {
    this.productItems = new ProductItemsRepository(
      this.productItemsRepository,
      this._loggerService,
      this._exceptionsService,
    );
  }
}
