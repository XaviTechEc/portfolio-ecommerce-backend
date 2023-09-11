import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExceptionsService } from 'src/common/infrastructure/exceptions/exceptions.service';
import { MyLoggerService } from 'src/common/infrastructure/logger/logger.service';
import { Repository } from 'typeorm';
import { ProductItem } from './postgresql/entities/ProductItem.entity';
import { ProductItemsRepository } from './postgresql/repositories/product-items.repository';

@Injectable()
export class ProductItemsDataService implements OnApplicationBootstrap {
  productItems: ProductItemsRepository;

  constructor(
    @InjectRepository(ProductItem)
    private productItemsRepository: Repository<ProductItem>,
    private _loggerService: MyLoggerService,
    private _exceptionsService: ExceptionsService,
  ) {}

  onApplicationBootstrap() {
    this.productItems = new ProductItemsRepository(
      this.productItemsRepository,
      this._loggerService,
      this._exceptionsService,
    );
  }
}
