import { Injectable } from '@nestjs/common';
import { ISeasonsRepository } from 'src/core/abstracts/repositories';
import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
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
    throw new Error('Method not implemented.');
  }
  getSeasonById(id: string): Promise<ISeason> {
    throw new Error('Method not implemented.');
  }
  createSeason(createSeasonInput: CreateSeasonInput): Promise<ISeason> {
    throw new Error('Method not implemented.');
  }
  updateSeason(
    id: string,
    updateSeasonInput: UpdateSeasonInput,
  ): Promise<ISeason> {
    throw new Error('Method not implemented.');
  }
  removeSeason(id: string): Promise<ISeason> {
    throw new Error('Method not implemented.');
  }
}
