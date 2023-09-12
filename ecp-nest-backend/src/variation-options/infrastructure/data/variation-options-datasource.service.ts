import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExceptionsService } from 'src/common/infrastructure/exceptions/exceptions.service';
import { MyLoggerService } from 'src/common/infrastructure/logger/logger.service';
import { Repository } from 'typeorm';
import { VariationOption } from './postgresql/entities/VariationOption.entity';
import { VariationOptionsRepository } from './postgresql/repositories/variation-options.repository';
import { IVariationOptionsDataSourceService } from 'src/variation-options/domain/abstracts/services/variation-options-datasource.abstract.service';

@Injectable()
export class VariationOptionsDataService
  implements IVariationOptionsDataSourceService, OnApplicationBootstrap
{
  variationOptions: VariationOptionsRepository;

  constructor(
    @InjectRepository(VariationOption)
    private variationOptionsRepository: Repository<VariationOption>,
    private _loggerService: MyLoggerService,
    private _exceptionsService: ExceptionsService,
  ) {}

  onApplicationBootstrap() {
    this.variationOptions = new VariationOptionsRepository(
      this.variationOptionsRepository,
      this._loggerService,
      this._exceptionsService,
    );
  }
}
