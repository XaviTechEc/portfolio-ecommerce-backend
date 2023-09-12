import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExceptionsService } from 'src/common/infrastructure/exceptions/exceptions.service';
import { MyLoggerService } from 'src/common/infrastructure/logger/logger.service';
import { Repository } from 'typeorm';
import { CategoryPromotion } from './postgresql/entities/CategoryPromotion.entity';
import { CategoryPromotionsRepository } from './postgresql/repositories/category-promotion.repository';
import { ICategoryPromotionsDataSourceService } from 'src/category-promotions/domain/abstracts/services/category-promotions-datasource.abstract.service';

@Injectable()
export class CategoryPromotionsDataService
  implements ICategoryPromotionsDataSourceService, OnApplicationBootstrap
{
  categoryPromotions: CategoryPromotionsRepository;

  constructor(
    @InjectRepository(CategoryPromotion)
    private categoryPromotionsRepository: Repository<CategoryPromotion>,
    private _loggerService: MyLoggerService,
    private _exceptionsService: ExceptionsService,
  ) {}
  onApplicationBootstrap() {
    this.categoryPromotions = new CategoryPromotionsRepository(
      this.categoryPromotionsRepository,
      this._loggerService,
      this._exceptionsService,
    );
  }
}
