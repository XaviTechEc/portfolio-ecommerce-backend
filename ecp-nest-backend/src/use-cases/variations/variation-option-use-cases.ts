import { Injectable } from '@nestjs/common';
import { IVariationOptionsRepository } from 'src/core/abstracts/repositories';
import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
import {
  CreateVariationOptionInput,
  UpdateVariationOptionInput,
} from 'src/core/dtos';
import { IVariationOption } from 'src/core/entities';
import { VariationOptionFactoryService } from './factory/variation-option-factory.service';
import { IGenericArgs } from 'src/core/abstracts/generic-args.repository';

@Injectable()
export class VariationOptionUseCases
  implements IVariationOptionsRepository<IVariationOption>
{
  constructor(
    private dataService: IDataSourcesService,
    private variationOptionFactoryService: VariationOptionFactoryService,
  ) {}
  getAllVariationOptions(
    args?: IGenericArgs<IVariationOption>,
  ): Promise<IVariationOption[]> {
    throw new Error('Method not implemented.');
  }
  getOneVariationOptionBy(
    fields: Partial<IVariationOption>,
    args?: IGenericArgs<IVariationOption>,
  ): Promise<IVariationOption> {
    throw new Error('Method not implemented.');
  }
  getVariationOptionById(id: string): Promise<IVariationOption> {
    throw new Error('Method not implemented.');
  }
  createVariationOption(
    createVariationOptionInput: CreateVariationOptionInput,
  ): Promise<IVariationOption> {
    throw new Error('Method not implemented.');
  }
  updateVariationOption(
    id: string,
    updateVariationOptionInput: UpdateVariationOptionInput,
  ): Promise<IVariationOption> {
    throw new Error('Method not implemented.');
  }
  removeVariationOption(id: string): Promise<IVariationOption> {
    throw new Error('Method not implemented.');
  }
}
