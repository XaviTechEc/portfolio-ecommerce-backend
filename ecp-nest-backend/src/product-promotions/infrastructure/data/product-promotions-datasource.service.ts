import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
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
    private _loggerService: ILoggerService,
    private _exceptionsService: IExceptionsService,
  ) {}
  onApplicationBootstrap() {
    this.productPromotions = new ProductPromotionsRepository(
      this.productPromotionsRepository,
      this._loggerService,
      this._exceptionsService,
    );
  }
}
