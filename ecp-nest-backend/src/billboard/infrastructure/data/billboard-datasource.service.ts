import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { IBillboardsRepository } from 'src/billboard/domain/abstracts/repositories/billboards.repository';
import { IBillboardsDataSourceService } from 'src/billboard/domain/abstracts/services/billboards-datasource.abstract.service';
import { IBillboard } from 'src/billboard/domain/entities/billboard.entity';
import { Billboard } from './postgresql/entities/billboard.entity';
import { Repository } from 'typeorm';
import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { InjectRepository } from '@nestjs/typeorm';
import { BillboardsRepository } from './postgresql/repositories/billboards.repository';

@Injectable()
export class BillboardDataService
  implements IBillboardsDataSourceService, OnApplicationBootstrap
{
  billboards: BillboardsRepository<Billboard>;

  constructor(
    @InjectRepository(Billboard)
    private _billboardsRepository: Repository<Billboard>,
    private _loggerService: ILoggerService,
    private _exceptionsService: IExceptionsService,
  ) {}

  onApplicationBootstrap() {
    this.billboards = new BillboardsRepository(
      this._billboardsRepository,
      this._loggerService,
      this._exceptionsService,
      this.constructor.name,
      'billboard',
    );
  }
}
