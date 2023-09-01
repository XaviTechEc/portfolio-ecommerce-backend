import { Injectable } from '@nestjs/common';
import { IVariationOptionsRepository } from 'src/core/abstracts/repositories';
import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
import {
  CreateVariationOptionInput,
  UpdateVariationOptionInput,
} from 'src/core/dtos';
import { IVariationOption } from 'src/core/entities';
import { VariationOptionFactoryService } from './factory/variation-option-factory.service';
import { IGenericArgs } from 'src/core/dtos/graphql/args/generic-args.repository';

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
    return this.dataService.variationOptions.getAllVariationOptions(args);
  }
  getOneVariationOptionBy(
    fields: Partial<IVariationOption>,
    args?: IGenericArgs<IVariationOption>,
  ): Promise<IVariationOption> {
    return this.dataService.variationOptions.getOneVariationOptionBy(
      fields,
      args,
    );
  }
  getVariationOptionById(id: string): Promise<IVariationOption> {
    return this.dataService.variationOptions.getVariationOptionById(id);
  }
  createVariationOption(
    createVariationOptionInput: CreateVariationOptionInput,
  ): Promise<IVariationOption> {
    const vo = this.variationOptionFactoryService.createVariationOption(
      createVariationOptionInput,
    );
    return this.dataService.variationOptions.createVariationOption(vo);
  }
  updateVariationOption(
    id: string,
    updateVariationOptionInput: UpdateVariationOptionInput,
  ): Promise<IVariationOption> {
    const vo = this.variationOptionFactoryService.updateVariationOption(
      updateVariationOptionInput,
    );
    return this.dataService.variationOptions.updateVariationOption(id, vo);
  }
  removeVariationOption(id: string): Promise<IVariationOption> {
    return this.dataService.variationOptions.removeVariationOption(id);
  }
}
