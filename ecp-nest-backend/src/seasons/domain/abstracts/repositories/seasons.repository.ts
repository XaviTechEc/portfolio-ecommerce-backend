import { IGenericArgs } from 'src/common/domain/dtos/graphql/args';
import {
  CreateSeasonInput,
  UpdateSeasonInput,
} from '../../dtos/graphql/inputs/season.input';
import { GetAllGenericResponse } from 'src/common/domain/interfaces/responses/get-all-generic-response.interface';

export abstract class ISeasonsRepository<T> {
  abstract getAllSeasons(
    args?: IGenericArgs<T>,
  ): Promise<GetAllGenericResponse<T>>;
  abstract getSeasonById(id: string): Promise<T>;
  abstract createSeason(createSeasonInput: CreateSeasonInput): Promise<T>;
  abstract updateSeason(
    id: string,
    updateSeasonInput: UpdateSeasonInput,
  ): Promise<T>;
  abstract removeSeason(id: string): Promise<T>;
}
