import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import { Repository } from 'typeorm';
import { Variation } from './postgresql/entities/Variation.entity';
import { VariationsRepository } from './postgresql/repositories/variations.repository';
import { IVariationsDataSourceService } from 'src/variations/domain/abstracts/services/variations-datasource.abstract.service';

@Injectable()
export class VariationsDataService
  implements IVariationsDataSourceService, OnApplicationBootstrap
{
  variations: VariationsRepository;

  constructor(
    @InjectRepository(Variation)
    private variationsRepository: Repository<Variation>,
    private _loggerService: ILoggerService,
    private _exceptionsService: IExceptionsService,
  ) {}

  onApplicationBootstrap() {
    this.variations = new VariationsRepository(
      this.variationsRepository,
      this._loggerService,
      this._exceptionsService,
    );
  }
}
