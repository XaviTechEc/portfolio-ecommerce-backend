import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExceptionsService } from 'src/common/infrastructure/exceptions/exceptions.service';
import { MyLoggerService } from 'src/common/infrastructure/logger/logger.service';
import { Repository } from 'typeorm';
import { ProductPromotion } from './postgresql/entities/ProductPromotion.entity';
import { ProductPromotionsRepository } from './postgresql/repositories/product-promotion.repository';

@Injectable()
export class ProductPromotionsDataService implements OnApplicationBootstrap {
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
