import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import {
  PaginationArgs,
  IGenericArgs,
} from 'src/common/domain/dtos/graphql/args';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
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
import { GetAllGenericResponse } from 'src/common/domain/interfaces/responses/get-all-generic-response.interface';
import { getPageCount } from 'src/common/infrastructure/helpers/get-page-count.helper';

const CONTEXT = 'VariationOptionsRepository';

export class VariationOptionsRepository
  implements IVariationOptionsRepository<VariationOption>
{
  private _repository: Repository<VariationOption>;
  private _loggerService: ILoggerService;
  private _exceptionsService: IExceptionsService;

  constructor(
    repository: Repository<VariationOption>,
    loggerService: ILoggerService,
    exceptionsService: IExceptionsService,
  ) {
    this._repository = repository;
    this._loggerService = loggerService;
    this._exceptionsService = exceptionsService;
  }
  async getVariationOptionsBy(
    term: string,
    fields: (keyof VariationOption)[],
    paginationArgs: PaginationArgs,
  ): Promise<GetAllGenericResponse<VariationOption>> {
    try {
      let queryOptions: FindManyOptions<VariationOption> = {};
      let relations: FindOptionsRelations<VariationOption> = {};
      let where: FindOptionsWhere<VariationOption> = {};
      let pageSize;

      if (paginationArgs) {
        const { limit = 10, offset = 0 } = paginationArgs;
        pageSize = limit;
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

      const [items, total] = await this._repository.findAndCount(queryOptions);
      return { items, total, pageCount: getPageCount(total, pageSize) };
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async getAllVariationOptions(
    args?: IGenericArgs<VariationOption>,
  ): Promise<GetAllGenericResponse<VariationOption>> {
    try {
      let qb = this._repository.createQueryBuilder('variationOption');
      let pageSize;

      if (args) {
        const { paginationArgs, searchArgs } = args;
        if (paginationArgs) {
          const { limit = 10, offset = 0 } = paginationArgs;
          pageSize = limit;
          qb = qb.take(limit).skip(offset);
        }

        if (searchArgs) {
          const { searchTerm } = searchArgs;
          if (searchTerm) {
            qb = qb
              .where(`variationOption.value ILIKE LOWER(:value)`)
              .setParameters({
                value: `%${searchTerm}%`,
              });
          }
        }
      }

      const [items, total] = await qb.getManyAndCount();
      return { items, total, pageCount: getPageCount(total, pageSize) };
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async getVariationOptionById(id: string): Promise<VariationOption> {
    try {
      const variationOptionFound = await this._repository.findOneBy({ id });
      if (!variationOptionFound) {
        return this._exceptionsService.notFound({
          message: `The variationOption with id ${id} could not be found`,
        });
      }
      return variationOptionFound;
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async createVariationOption(
    createVariationOptionInput: CreateVariationOptionInput,
  ): Promise<VariationOption> {
    try {
      const newVariationOption = this._repository.create({
        ...createVariationOptionInput,
      });
      return this._repository.save(newVariationOption);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async updateVariationOption(
    id: string,
    updateVariationOptionInput: UpdateVariationOptionInput,
  ): Promise<VariationOption> {
    try {
      await this.getVariationOptionById(id);
      const newVariationOption = await this._repository.preload({
        ...updateVariationOptionInput,
      });
      return this._repository.save(newVariationOption);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async removeVariationOption(id: string): Promise<VariationOption> {
    try {
      const variationOption = await this.getVariationOptionById(id);
      return this._repository.remove(variationOption);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }
}
