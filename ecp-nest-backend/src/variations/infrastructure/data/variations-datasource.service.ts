import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExceptionsService } from 'src/common/infrastructure/exceptions/exceptions.service';
import { MyLoggerService } from 'src/common/infrastructure/logger/logger.service';
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
    private _loggerService: MyLoggerService,
    private _exceptionsService: ExceptionsService,
  ) {}

  onApplicationBootstrap() {
    this.variations = new VariationsRepository(
      this.variationsRepository,
      this._loggerService,
      this._exceptionsService,
    );
  }
}
