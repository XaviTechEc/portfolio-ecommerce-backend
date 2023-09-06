import { IGenericArgs } from 'src/core/dtos/graphql/args/generic-args.repository';
import { IVariationOptionsRepository } from 'src/core/abstracts/repositories';
import {
  CreateVariationOptionInput,
  UpdateVariationOptionInput,
} from 'src/core/dtos';
import { Repository } from 'typeorm';
import { VariationOption } from '../../entities/outputs/entities';
import { LoggerService } from '@nestjs/common';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';

export class VariationOptionsRepository
  implements IVariationOptionsRepository<VariationOption>
{
  private _repository: Repository<VariationOption>;
  private _loggerService: LoggerService;
  private _exceptionsService: ExceptionsService;

  constructor(
    repository: Repository<VariationOption>,
    loggerService: LoggerService,
    exceptionsService: ExceptionsService,
  ) {
    this._repository = repository;
    this._loggerService = loggerService;
    this._exceptionsService = exceptionsService;
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
  async getOneVariationOptionBy(
    fields: Partial<VariationOption>,
    args?: IGenericArgs<VariationOption>,
  ): Promise<VariationOption> {
    throw new Error('Method not implemented.');
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
