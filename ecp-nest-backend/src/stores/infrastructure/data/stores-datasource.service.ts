import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import { IStoresDataSourceService } from 'src/stores/domain/abstracts/services/stores-datasource.abstract.service';
import { Repository } from 'typeorm';
import { Store } from './postgresql/entities/Store.entity';
import { StoresPostgresRepository } from './postgresql/repositories/stores.repository';

@Injectable()
export class StoresDataService
  implements IStoresDataSourceService, OnApplicationBootstrap
{
  stores: StoresPostgresRepository<Store>;

  constructor(
    @InjectRepository(Store)
    private _repository: Repository<Store>,
    private _loggerService: ILoggerService,
    private _exceptionsService: IExceptionsService,
  ) {}

  onApplicationBootstrap() {
    this.stores = new StoresPostgresRepository<Store>(
      this._repository,
      this._loggerService,
      this._exceptionsService,
      this.constructor.name,
      'store',
    );
  }
}
