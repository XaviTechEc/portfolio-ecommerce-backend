import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExceptionsService } from 'src/common/infrastructure/exceptions/exceptions.service';
import { MyLoggerService } from 'src/common/infrastructure/logger/logger.service';
import { Repository } from 'typeorm';
import { Season } from './postgresql/entities/Season.entity';
import { SeasonsRepository } from './postgresql/repositories/seasons.repository';
import { ISeasonsDataSourceService } from 'src/seasons/domain/abstracts/services/seasons-datasource.abstract.service';

@Injectable()
export class SeasonsDataService
  implements ISeasonsDataSourceService, OnApplicationBootstrap
{
  seasons: SeasonsRepository;

  constructor(
    @InjectRepository(Season)
    private seasonsRepository: Repository<Season>,
    private _loggerService: MyLoggerService,
    private _exceptionsService: ExceptionsService,
  ) {}

  onApplicationBootstrap() {
    this.seasons = new SeasonsRepository(
      this.seasonsRepository,
      this._loggerService,
      this._exceptionsService,
    );
  }
}
