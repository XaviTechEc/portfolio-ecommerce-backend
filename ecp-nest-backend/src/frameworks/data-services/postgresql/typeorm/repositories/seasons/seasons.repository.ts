import { IGenericArgs } from 'src/core/dtos/graphql/args/generic-args.repository';
import { ISeasonsRepository } from 'src/core/abstracts/repositories';
import { CreateSeasonInput, UpdateSeasonInput } from 'src/core/dtos';
import { Repository } from 'typeorm';
import { Season } from '../../entities/outputs/entities';

export class SeasonsRepository implements ISeasonsRepository<Season> {
  private _repository: Repository<Season>;

  constructor(repository: Repository<Season>) {
    this._repository = repository;
  }
  getAllSeasons(args?: IGenericArgs<Season>): Promise<Season[]> {
    throw new Error('Method not implemented.');
  }
  getSeasonById(id: string): Promise<Season> {
    throw new Error('Method not implemented.');
  }
  createSeason(createSeasonInput: CreateSeasonInput): Promise<Season> {
    throw new Error('Method not implemented.');
  }
  updateSeason(
    id: string,
    updateSeasonInput: UpdateSeasonInput,
  ): Promise<Season> {
    throw new Error('Method not implemented.');
  }
  removeSeason(id: string): Promise<Season> {
    throw new Error('Method not implemented.');
  }
}
