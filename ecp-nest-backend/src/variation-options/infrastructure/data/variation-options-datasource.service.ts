import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import { IVariationOptionsDataSourceService } from 'src/variation-options/domain/abstracts/services/variation-options-datasource.abstract.service';
import { Repository } from 'typeorm';
import { VariationOption } from './postgresql/entities/VariationOption.entity';
import { VariationOptionsPostgresRepository } from './postgresql/repositories/variation-options.repository';

@Injectable()
export class VariationOptionsDataService
  implements IVariationOptionsDataSourceService, OnApplicationBootstrap
{
  variationOptions: VariationOptionsPostgresRepository<VariationOption>;

  constructor(
    @InjectRepository(VariationOption)
    private _repository: Repository<VariationOption>,
    private _loggerService: ILoggerService,
    private _exceptionsService: IExceptionsService,
  ) {}

  onApplicationBootstrap() {
    this.variationOptions =
      new VariationOptionsPostgresRepository<VariationOption>(
        this._repository,
        this._loggerService,
        this._exceptionsService,
        this.constructor.name,
        'variation_option',
      );
  }
}
