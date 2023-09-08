import { Injectable } from '@nestjs/common';
import { ISeasonsRepository } from 'src/core/abstracts/repositories';
import { IDataSourcesService } from 'src/core/abstracts/services/data-services/data-sources.service';
import { CreateSeasonInput, UpdateSeasonInput } from 'src/core/dtos';
import { ISeason } from 'src/core/entities';
import { SeasonFactoryService } from './season-factory.service';
import { IGenericArgs } from 'src/core/dtos/graphql/args/generic-args.repository';

@Injectable()
export class SeasonUseCases implements ISeasonsRepository<ISeason> {
  constructor(
    private dataService: IDataSourcesService,
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
