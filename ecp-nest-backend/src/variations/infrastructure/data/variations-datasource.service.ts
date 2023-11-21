import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import { IVariationsDataSourceService } from 'src/variations/domain/abstracts/services/variations-datasource.abstract.service';
import { Repository } from 'typeorm';
import { Variation } from './postgresql/entities/Variation.entity';
import { VariationsPostgresRepository } from './postgresql/repositories/variations.repository';

@Injectable()
export class VariationsDataService
  implements IVariationsDataSourceService, OnApplicationBootstrap
{
  variations: VariationsPostgresRepository<Variation>;

  constructor(
    @InjectRepository(Variation)
    private _repository: Repository<Variation>,
    private _loggerService: ILoggerService,
    private _exceptionsService: IExceptionsService,
  ) {}

  onApplicationBootstrap() {
    this.variations = new VariationsPostgresRepository<Variation>(
      this._repository,
      this._loggerService,
      this._exceptionsService,
      this.constructor.name,
      'variation',
    );
  }
}
