import { IGenericArgs } from 'src/core/abstracts/generic-args.repository';
import { ISeasonsRepository } from 'src/core/abstracts/repositories';
import { CreateSeasonInput, UpdateSeasonInput } from 'src/core/dtos';
import { Repository } from 'typeorm';

export class SeasonsRepository<T> implements ISeasonsRepository<T> {
  private _repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this._repository = repository;
  }
  getAllSeasons(args?: IGenericArgs<T>): Promise<T[]> {
    throw new Error('Method not implemented.');
  }
  getSeasonById(id: string): Promise<T> {
    throw new Error('Method not implemented.');
  }
  createSeason(createSeasonInput: CreateSeasonInput): Promise<T> {
    throw new Error('Method not implemented.');
  }
  updateSeason(id: string, updateSeasonInput: UpdateSeasonInput): Promise<T> {
    throw new Error('Method not implemented.');
  }
  removeSeason(id: string): Promise<T> {
    throw new Error('Method not implemented.');
  }
}
