import { Injectable } from '@nestjs/common';
import { IGenericArgs } from 'src/common/domain/dtos/graphql/args';
import { ISeasonsRepository } from 'src/seasons/domain/abstracts/repositories/seasons.repository';
import { ISeasonsDataSourceService } from 'src/seasons/domain/abstracts/services/seasons-datasource.abstract.service';
import {
  CreateSeasonInput,
  UpdateSeasonInput,
} from 'src/seasons/domain/dtos/graphql/inputs/season.input';
import { ISeason } from 'src/seasons/domain/entities/season.entity';
import { SeasonFactoryService } from './factory/season-factory.service';

@Injectable()
export class SeasonUseCases implements ISeasonsRepository<ISeason> {
  constructor(
    private dataService: ISeasonsDataSourceService,
    private seasonFactoryService: SeasonFactoryService,
  ) {}
  getAllSeasons(args?: IGenericArgs<ISeason>): Promise<ISeason[]> {
    return this.dataService.seasons.getAllSeasons(args);
  }
  getSeasonById(id: string): Promise<ISeason> {
    return this.dataService.seasons.getSeasonById(id);
  }
  createSeason(createSeasonInput: CreateSeasonInput): Promise<ISeason> {
    const season = this.seasonFactoryService.createSeason(createSeasonInput);
    return this.dataService.seasons.createSeason(season);
  }
  updateSeason(
    id: string,
    updateSeasonInput: UpdateSeasonInput,
  ): Promise<ISeason> {
    const season = this.seasonFactoryService.updateSeason(updateSeasonInput);

    return this.dataService.seasons.updateSeason(id, season);
  }
  removeSeason(id: string): Promise<ISeason> {
    return this.dataService.seasons.removeSeason(id);
  }
}
