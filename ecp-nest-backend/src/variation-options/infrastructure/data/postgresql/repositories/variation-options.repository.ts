import { MyLoggerService } from 'src/common/infrastructure/logger/logger.service';
import {
  PaginationArgs,
  IGenericArgs,
} from 'src/common/domain/dtos/graphql/args';
import { ExceptionsService } from 'src/common/infrastructure/exceptions/exceptions.service';
import { IVariationOptionsRepository } from 'src/variation-options/domain/abstracts/repositories/variation-options.repository';
import {
  CreateVariationOptionInput,
  UpdateVariationOptionInput,
} from 'src/variation-options/domain/dtos/graphql/inputs/variation-option.input';
import {
  Repository,
  FindManyOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  ILike,
} from 'typeorm';
import { VariationOption } from '../entities/VariationOption.entity';

export class VariationOptionsRepository
  implements IVariationOptionsRepository<VariationOption>
{
  private _repository: Repository<VariationOption>;
  private _loggerService: MyLoggerService;
  private _exceptionsService: ExceptionsService;

  constructor(
    repository: Repository<VariationOption>,
    loggerService: MyLoggerService,
    exceptionsService: ExceptionsService,
  ) {
    this._repository = repository;
    this._loggerService = loggerService;
    this._exceptionsService = exceptionsService;
  }
  async getVariationOptionsBy(
    term: string,
    fields: (keyof VariationOption)[],
    paginationArgs: PaginationArgs,
  ): Promise<VariationOption[]> {
    let queryOptions: FindManyOptions<VariationOption> = {};
    let relations: FindOptionsRelations<VariationOption> = {};
    let where: FindOptionsWhere<VariationOption> = {};

    if (paginationArgs) {
      const { limit = 10, offset = 0 } = paginationArgs;
      queryOptions = { take: limit, skip: offset };
    }

    for (const field of fields) {
      if (field === 'variation') {
        relations = { ...relations, variation: true };
        where = {
          ...where,
          variation: [{ name: ILike(`%${term}%`) }, { id: term }],
        };
      }
    }

    queryOptions = { ...queryOptions, relations, where };

    const variationOptionsBy = await this._repository.find(queryOptions);
    return variationOptionsBy;
  }

  async getAllVariationOptions(
    args?: IGenericArgs<VariationOption>,
  ): Promise<VariationOption[]> {
    let qb = this._repository.createQueryBuilder('variationOption');

    if (args) {
      const { paginationArgs, searchArgs } = args;
      if (paginationArgs) {
        const { limit = 10, offset = 0 } = paginationArgs;
        qb = qb.take(limit).skip(offset);
      }

      if (searchArgs) {
        const { searchTerm } = searchArgs;

        qb = qb
          .where(`variationOption.value ILIKE LOWER(:value)`)
          .setParameters({
            value: `%${searchTerm}%`,
          });
      }
    }

    const variationOptions = await qb.getMany();
    return variationOptions;
  }

  async getVariationOptionById(id: string): Promise<VariationOption> {
    const variationOptionFound = await this._repository.findOneBy({ id });
    if (!variationOptionFound) {
      return this._exceptionsService.notFound({
        message: `The variationOption with id ${id} could not be found`,
      });
    }
    return this._repository.save(variationOptionFound);
  }
  async createVariationOption(
    createVariationOptionInput: CreateVariationOptionInput,
  ): Promise<VariationOption> {
    const newVariationOption = this._repository.create({
      ...createVariationOptionInput,
    });
    return newVariationOption;
  }
  async updateVariationOption(
    id: string,
    updateVariationOptionInput: UpdateVariationOptionInput,
  ): Promise<VariationOption> {
    await this.getVariationOptionById(id);
    const newVariationOption = await this._repository.preload({
      ...updateVariationOptionInput,
    });
    if (!newVariationOption) {
      return this._exceptionsService.notFound({
        message: 'The VariationOption could not be preloaded',
      });
    }
    return this._repository.save(newVariationOption);
  }
  async removeVariationOption(id: string): Promise<VariationOption> {
    const variationOption = await this.getVariationOptionById(id);
    return this._repository.remove(variationOption);
  }
}
