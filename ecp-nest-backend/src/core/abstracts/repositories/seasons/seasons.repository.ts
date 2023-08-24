import { ISeason } from 'src/core/entities';

export abstract class ISeasonsRepository {
  abstract getAllSeasons(): Promise<ISeason[]>;
  abstract getSeasonById(id: string): Promise<ISeason>;
  abstract createSeason(createSeasonInput: any): Promise<ISeason>;
  abstract updateSeason(updateSeasonInput: any): Promise<ISeason>;
  abstract removeSeason(id: string): Promise<ISeason>;
}
