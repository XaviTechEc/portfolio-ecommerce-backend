import { CreateSeasonInput, UpdateSeasonInput } from 'src/core/dtos';
import { ISeason } from 'src/core/entities';

export abstract class ISeasonsRepository {
  abstract getAllSeasons(): Promise<ISeason[]>;
  abstract getSeasonById(id: string): Promise<ISeason>;
  abstract createSeason(createSeasonInput: CreateSeasonInput): Promise<ISeason>;
  abstract updateSeason(
    id: string,
    updateSeasonInput: UpdateSeasonInput,
  ): Promise<ISeason>;
  abstract removeSeason(id: string): Promise<ISeason>;
}
