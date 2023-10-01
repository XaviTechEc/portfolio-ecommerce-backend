import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IStoresRepository } from 'src/stores/domain/abstracts/repositories/stores.repository';
import { IStoresDataSourceService } from 'src/stores/domain/abstracts/services/stores-datasource.abstract.service';
import { IStore } from 'src/stores/domain/entities/store.entity';
import { Repository } from 'typeorm';
import { Store } from './postgresql/entities/Store.entity';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import { StoresRepository } from './postgresql/repositories/stores.repository';

@Injectable()
export class StoreDataService
  implements IStoresDataSourceService, OnApplicationBootstrap
{
  stores: IStoresRepository<IStore>;

  constructor(
    @InjectRepository(Store)
    private _storesRepository: Repository<Store>,
    private _loggerService: ILoggerService,
    private _exceptionsService: IExceptionsService,
  ) {}

  onApplicationBootstrap() {
    this.stores = new StoresRepository(
      this._storesRepository,
      this._loggerService,
      this._exceptionsService,
    );
  }
}
