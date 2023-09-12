import { MyLoggerService } from 'src/common/infrastructure/logger/logger.service';
import {
  PaginationArgs,
  IGenericArgs,
} from 'src/common/domain/dtos/graphql/args';
import { ExceptionsService } from 'src/common/infrastructure/exceptions/exceptions.service';
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

export class VariationsRepository implements IVariationsRepository<Variation> {
  private _repository: Repository<Variation>;
  private _loggerService: MyLoggerService;
  private _exceptionsService: ExceptionsService;

  constructor(
    repository: Repository<Variation>,
    loggerService: MyLoggerService,
    exceptionsService: ExceptionsService,
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

    const variationsBy = await this._repository.find(queryOptions);
    return variationsBy;
  }
  async getAllVariations(args?: IGenericArgs<Variation>): Promise<Variation[]> {
    let qb = this._repository.createQueryBuilder('variation');

    if (args) {
      const { paginationArgs, searchArgs } = args;
      if (paginationArgs) {
        const { limit = 10, offset = 0 } = paginationArgs;
        qb = qb.take(limit).skip(offset);
      }

      if (searchArgs) {
        const { searchTerm } = searchArgs;

        qb = qb.where(`variation.name ILIKE LOWER(:name)`).setParameters({
          name: `%${searchTerm}%`,
        });
      }
    }

    const variations = await qb.getMany();
    return variations;
  }
  async getVariationById(id: string): Promise<Variation> {
    const variationFound = await this._repository.findOneBy({ id });
    if (!variationFound) {
      return this._exceptionsService.notFound({
        message: `The variation with id ${id} could not be found`,
      });
    }
    return this._repository.save(variationFound);
  }
  async createVariation(
    createVariationInput: CreateVariationInput,
  ): Promise<Variation> {
    const newVariation = this._repository.create({ ...createVariationInput });
    return newVariation;
  }
  async updateVariation(
    id: string,
    updateVariationInput: UpdateVariationInput,
  ): Promise<Variation> {
    await this.getVariationById(id);
    const newVariation = await this._repository.preload({
      ...updateVariationInput,
    });
    if (!newVariation) {
      return this._exceptionsService.notFound({
        message: 'The Variation could not be preloaded',
      });
    }
    return this._repository.save(newVariation);
  }
  async removeVariation(id: string): Promise<Variation> {
    const variation = await this.getVariationById(id);
    return this._repository.remove(variation);
  }
}
