import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import { IGenericArgs } from 'src/common/domain/dtos/graphql/args';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { ISeasonsRepository } from 'src/seasons/domain/abstracts/repositories/seasons.repository';
import {
  CreateSeasonInput,
  UpdateSeasonInput,
} from 'src/seasons/domain/dtos/graphql/inputs/season.input';
import { Repository } from 'typeorm';
import { Season } from '../entities/Season.entity';

const CONTEXT = 'SeasonsRepository';

export class SeasonsRepository implements ISeasonsRepository<Season> {
  private _repository: Repository<Season>;
  private _loggerService: ILoggerService;
  private _exceptionsService: IExceptionsService;

  constructor(
    repository: Repository<Season>,
    loggerService: ILoggerService,
    exceptionsService: IExceptionsService,
  ) {
    this._repository = repository;
    this._loggerService = loggerService;
    this._exceptionsService = exceptionsService;
  }
  async getAllSeasons(args?: IGenericArgs<Season>): Promise<Season[]> {
    try {
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

      const seasons = (await qb.getMany()) ?? [];
      return seasons;
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async getSeasonById(id: string): Promise<Season> {
    try {
      const seasonFound = await this._repository.findOneBy({ id });
      if (!seasonFound) {
        return this._exceptionsService.notFound({
          message: `The season with id ${id} could not be found`,
        });
      }
      return seasonFound;
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async createSeason(createSeasonInput: CreateSeasonInput): Promise<Season> {
    try {
      const newSeason = this._repository.create({ ...createSeasonInput });
      return this._repository.save(newSeason);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async updateSeason(
    id: string,
    updateSeasonInput: UpdateSeasonInput,
  ): Promise<Season> {
    try {
      await this.getSeasonById(id);
      const newSeason = await this._repository.preload({
        ...updateSeasonInput,
      });
      return this._repository.save(newSeason);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async removeSeason(id: string): Promise<Season> {
    try {
      const season = await this.getSeasonById(id);
      return this._repository.remove(season);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }
}
