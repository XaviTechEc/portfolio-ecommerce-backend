import { IGenericArgs } from 'src/core/dtos/graphql/args/generic-args.repository';
import { ISeasonsRepository } from 'src/core/abstracts/repositories';
import { CreateSeasonInput, UpdateSeasonInput } from 'src/core/dtos';
import { Repository } from 'typeorm';
import { Season } from '../../entities/outputs/entities';
import { LoggerService } from '@nestjs/common';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';

export class SeasonsRepository implements ISeasonsRepository<Season> {
  private _repository: Repository<Season>;
  private _loggerService: LoggerService;
  private _exceptionsService: ExceptionsService;

  constructor(
    repository: Repository<Season>,
    loggerService: LoggerService,
    exceptionsService: ExceptionsService,
  ) {
    this._repository = repository;
    this._loggerService = loggerService;
    this._exceptionsService = exceptionsService;
  }
  async getAllSeasons(args?: IGenericArgs<Season>): Promise<Season[]> {
    let qb = this._repository.createQueryBuilder('season');

    if (args) {
      const { paginationArgs, searchArgs } = args;
      if (paginationArgs) {
        const { limit = 10, offset = 0 } = paginationArgs;
        qb = qb.take(limit).skip(offset);
      }

      if (searchArgs) {
        const { searchTerm } = searchArgs;

        qb = qb
          .where(`season.description ILIKE LOWER(:description)`)
          .setParameters({
            description: `%${searchTerm}%`,
          });
      }
    }

    const seasons = await qb.getMany();
    return seasons;
  }
  async getSeasonById(id: string): Promise<Season> {
    const seasonFound = await this._repository.findOneBy({ id });
    if (!seasonFound) {
      return this._exceptionsService.notFound({
        message: `The season with id ${id} could not be found`,
      });
    }
    return this._repository.save(seasonFound);
  }
  async createSeason(createSeasonInput: CreateSeasonInput): Promise<Season> {
    const newSeason = this._repository.create({ ...createSeasonInput });
    return newSeason;
  }
  async updateSeason(
    id: string,
    updateSeasonInput: UpdateSeasonInput,
  ): Promise<Season> {
    await this.getSeasonById(id);
    const newSeason = await this._repository.preload({
      ...updateSeasonInput,
    });
    if (!newSeason) {
      return this._exceptionsService.notFound({
        message: 'The Season could not be preloaded',
      });
    }
    return this._repository.save(newSeason);
  }
  async removeSeason(id: string): Promise<Season> {
    const season = await this.getSeasonById(id);
    return this._repository.remove(season);
  }
}
