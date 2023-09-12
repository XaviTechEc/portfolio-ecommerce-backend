import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './postgresql/entities/Product.entity';
import { ProductsRepository } from './postgresql/repositories/products.repository';
import { ExceptionsService } from 'src/common/infrastructure/exceptions/exceptions.service';
import { MyLoggerService } from 'src/common/infrastructure/logger/logger.service';
import { IProductsDataSourceService } from 'src/products/domain/abstracts/services/products-datasource.abstract.service';

@Injectable()
export class ProductsDataService
  implements IProductsDataSourceService, OnApplicationBootstrap
{
  products: ProductsRepository;

  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    private _loggerService: MyLoggerService,
    private _exceptionsService: ExceptionsService,
  ) {}

  onApplicationBootstrap() {
    this.products = new ProductsRepository(
      this.productsRepository,
      this._loggerService,
      this._exceptionsService,
    );
  }
}
