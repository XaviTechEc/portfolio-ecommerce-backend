import { Injectable } from '@nestjs/common';
import { ISeasonsRepository } from 'src/core/abstracts/repositories';
import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
import { CreateSeasonInput, UpdateSeasonInput } from 'src/core/dtos';
import { ISeason } from 'src/core/entities';
import { SeasonFactoryService } from './season-factory.service';

@Injectable()
export class SeasonUseCases implements ISeasonsRepository {
  constructor(
    private dataService: IDataSourcesService,
    private seasonFactoryService: SeasonFactoryService,
  ) {}
  getAllSeasons(): Promise<ISeason[]> {
    return this.dataService.seasons.getAll();
  }
  getSeasonById(id: string): Promise<ISeason> {
    return this.dataService.seasons.getOneById(id);
  }
  createSeason(createSeasonInput: CreateSeasonInput): Promise<ISeason> {
    const season = this.seasonFactoryService.createSeason(createSeasonInput);
    return this.dataService.seasons.create(season);
  }
  updateSeason(
    id: string,
    updateSeasonInput: UpdateSeasonInput,
  ): Promise<ISeason> {
    const season = this.seasonFactoryService.updateSeason(updateSeasonInput);
    return this.dataService.seasons.updateOneById(id, season);
  }
  removeSeason(id: string): Promise<ISeason> {
    return this.dataService.seasons.deleteOneById(id);
  }
}
