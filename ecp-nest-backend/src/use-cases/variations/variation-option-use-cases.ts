import { Injectable } from '@nestjs/common';
import { IVariationOptionsRepository } from 'src/core/abstracts/repositories';
import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
import {
  CreateVariationOptionInput,
  UpdateVariationOptionInput,
} from 'src/core/dtos';
import { IVariationOption } from 'src/core/entities';
import { VariationOptionFactoryService } from './factory/variation-option-factory.service';

@Injectable()
export class VariationOptionUseCases implements IVariationOptionsRepository {
  constructor(
    private dataService: IDataSourcesService,
    private variationOptionFactoryService: VariationOptionFactoryService,
  ) {}

  getAllVariationOptions(): Promise<IVariationOption[]> {
    return this.dataService.variationOptions.getAll();
  }

  getVariationOptionById(id: string): Promise<IVariationOption> {
    return this.dataService.variationOptions.getOneById(id);
  }

  getOneVariationOptionBy(
    fields: Partial<IVariationOption>,
  ): Promise<IVariationOption> {
    return this.dataService.variationOptions.getOneBy(fields);
  }

  createVariationOption(
    createVariationOptionInput: CreateVariationOptionInput,
  ): Promise<IVariationOption> {
    const variationOption =
      this.variationOptionFactoryService.createVariationOption(
        createVariationOptionInput,
      );
    return this.dataService.variationOptions.create(variationOption);
  }

  updateVariationOption(
    id: string,
    updateVariationOptionInput: UpdateVariationOptionInput,
  ): Promise<IVariationOption> {
    const variationOption =
      this.variationOptionFactoryService.updateVariationOption(
        updateVariationOptionInput,
      );
    return this.dataService.variationOptions.updateOneById(id, variationOption);
  }

  removeVariationOption(id: string): Promise<IVariationOption> {
    return this.dataService.variationOptions.deleteOneById(id);
  }
}
