import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import {
  PaginationArgs,
  IGenericArgs,
} from 'src/common/domain/dtos/graphql/args';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { IVariationsRepository } from 'src/variations/domain/abstracts/repositories/variations.repository';
import {
  CreateVariationInput,
  UpdateVariationInput,
} from 'src/variations/domain/dtos/graphql/inputs/variation.input';
import {
  Repository,
  FindManyOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  ILike,
} from 'typeorm';
import { Variation } from '../entities/Variation.entity';

const CONTEXT = 'VariationsRepository';

export class VariationsRepository implements IVariationsRepository<Variation> {
  private _repository: Repository<Variation>;
  private _loggerService: ILoggerService;
  private _exceptionsService: IExceptionsService;

  constructor(
    repository: Repository<Variation>,
    loggerService: ILoggerService,
    exceptionsService: IExceptionsService,
  ) {
    this._repository = repository;
    this._loggerService = loggerService;
    this._exceptionsService = exceptionsService;
  }

  async getVariationsBy(
    term: string,
    fields: (keyof Variation)[],
    paginationArgs: PaginationArgs,
  ): Promise<Variation[]> {
    try {
      let queryOptions: FindManyOptions<Variation> = {};
      let relations: FindOptionsRelations<Variation> = {};
      let where: FindOptionsWhere<Variation> = {};

      if (paginationArgs) {
        const { limit = 10, offset = 0 } = paginationArgs;
        queryOptions = { take: limit, skip: offset };
      }

      for (const field of fields) {
        if (field === 'category') {
          relations = { ...relations, category: true };
          where = {
            ...where,
            category: [
              { value: ILike(`%${term}%`) },
              { description: ILike(`%${term}%`) },
              { id: term },
            ],
          };
        }
      }

      queryOptions = { ...queryOptions, relations, where };

      const variationsBy = (await this._repository.find(queryOptions)) ?? [];
      return variationsBy;
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async getAllVariations(args?: IGenericArgs<Variation>): Promise<Variation[]> {
    try {
      let qb = this._repository.createQueryBuilder('variation');

      if (args) {
        const { paginationArgs, searchArgs } = args;
        if (paginationArgs) {
          const { limit = 10, offset = 0 } = paginationArgs;
          qb = qb.take(limit).skip(offset);
        }

        if (searchArgs) {
          const { searchTerm } = searchArgs;

          if (searchTerm) {
            qb = qb.where(`variation.name ILIKE LOWER(:name)`).setParameters({
              name: `%${searchTerm}%`,
            });
          }
        }
      }

      const variations = (await qb.getMany()) ?? [];
      return variations;
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async getVariationById(id: string): Promise<Variation> {
    try {
      const variationFound = await this._repository.findOneBy({ id });
      if (!variationFound) {
        return this._exceptionsService.notFound({
          message: `The variation with id ${id} could not be found`,
        });
      }
      return variationFound;
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async createVariation(
    createVariationInput: CreateVariationInput,
  ): Promise<Variation> {
    try {
      const newVariation = this._repository.create({ ...createVariationInput });
      return this._repository.save(newVariation);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async updateVariation(
    id: string,
    updateVariationInput: UpdateVariationInput,
  ): Promise<Variation> {
    try {
      await this.getVariationById(id);
      const newVariation = await this._repository.preload({
        ...updateVariationInput,
      });
      return this._repository.save(newVariation);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async removeVariation(id: string): Promise<Variation> {
    try {
      const variation = await this.getVariationById(id);
      return this._repository.remove(variation);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }
}
