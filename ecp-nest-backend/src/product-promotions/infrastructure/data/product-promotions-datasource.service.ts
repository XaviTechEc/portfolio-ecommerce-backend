import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExceptionsService } from 'src/common/infrastructure/exceptions/exceptions.service';
import { MyLoggerService } from 'src/common/infrastructure/logger/logger.service';
import { Repository } from 'typeorm';
import { ProductPromotion } from './postgresql/entities/ProductPromotion.entity';
import { ProductPromotionsRepository } from './postgresql/repositories/product-promotion.repository';
import { IProductPromotionsDataSourceService } from 'src/product-promotions/domain/abstracts/services/product-promotions-datasource.abstract.service';

@Injectable()
export class ProductPromotionsDataService
  implements IProductPromotionsDataSourceService, OnApplicationBootstrap
{
  productPromotions: ProductPromotionsRepository;

  constructor(
    @InjectRepository(ProductPromotion)
    private productPromotionsRepository: Repository<ProductPromotion>,
    private _loggerService: MyLoggerService,
    private _exceptionsService: ExceptionsService,
  ) {}
  onApplicationBootstrap() {
    this.productPromotions = new ProductPromotionsRepository(
      this.productPromotionsRepository,
      this._loggerService,
      this._exceptionsService,
    );
  }
}
