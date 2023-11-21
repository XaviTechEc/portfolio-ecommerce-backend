import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './postgresql/entities/Product.entity';
import { ProductsPostgresRepository } from './postgresql/repositories/products.repository';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import { IProductsDataSourceService } from 'src/products/domain/abstracts/services/products-datasource.abstract.service';

@Injectable()
export class ProductsDataService
  implements IProductsDataSourceService, OnApplicationBootstrap
{
  products: ProductsPostgresRepository<Product>;

  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    private _loggerService: ILoggerService,
    private _exceptionsService: IExceptionsService,
  ) {}

  onApplicationBootstrap() {
    this.products = new ProductsPostgresRepository(
      this.productsRepository,
      this._loggerService,
      this._exceptionsService,
      this.constructor.name,
      'product',
    );
  }
}
