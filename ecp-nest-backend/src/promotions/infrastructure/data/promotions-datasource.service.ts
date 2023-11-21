import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Promotion } from './postgresql/entities/Promotion.entity';
import { PromotionsPostgresRepository } from './postgresql/repositories/promotions.repository';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import { IPromotionsDataSourceService } from 'src/promotions/domain/abstracts/services/promotions-datasource.abstract.service';

@Injectable()
export class PromotionsDataService
  implements IPromotionsDataSourceService, OnApplicationBootstrap
{
  promotions: PromotionsPostgresRepository<Promotion>;

  constructor(
    @InjectRepository(Promotion)
    private promotionsPostgresRepository: Repository<Promotion>,
    private _loggerService: ILoggerService,
    private _exceptionsService: IExceptionsService,
  ) {}
  onApplicationBootstrap() {
    this.promotions = new PromotionsPostgresRepository(
      this.promotionsPostgresRepository,
      this._loggerService,
      this._exceptionsService,
      this.constructor.name,
      'promotion',
    );
  }
}
