import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Promotion } from './postgresql/entities/Promotion.entity';
import { PromotionsRepository } from './postgresql/repositories/promotions.repository';
import { ExceptionsService } from 'src/common/infrastructure/exceptions/exceptions.service';
import { MyLoggerService } from 'src/common/infrastructure/logger/logger.service';
import { IPromotionsDataSourceService } from 'src/promotions/domain/abstracts/services/promotions-datasource.abstract.service';

@Injectable()
export class PromotionsDataService
  implements IPromotionsDataSourceService, OnApplicationBootstrap
{
  promotions: PromotionsRepository;

  constructor(
    @InjectRepository(Promotion)
    private promotionsRepository: Repository<Promotion>,
    private _loggerService: MyLoggerService,
    private _exceptionsService: ExceptionsService,
  ) {}
  onApplicationBootstrap() {
    this.promotions = new PromotionsRepository(
      this.promotionsRepository,
      this._loggerService,
      this._exceptionsService,
    );
  }
}
