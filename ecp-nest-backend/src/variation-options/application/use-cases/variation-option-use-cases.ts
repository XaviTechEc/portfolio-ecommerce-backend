import { Injectable } from '@nestjs/common';
import {
  IGenericArgs,
  PaginationArgs,
} from 'src/common/domain/dtos/graphql/args';
import { IVariationOptionsDataSourceService } from 'src/variation-options/domain/abstracts/services/variation-options-datasource.abstract.service';
import {
  CreateVariationOptionInput,
  UpdateVariationOptionInput,
} from 'src/variation-options/domain/dtos/graphql/inputs/variation-option.input';
import { IVariationOption } from 'src/variation-options/domain/entities/variation-option.entity';
import { VariationOptionFactoryService } from './factory/variation-option-factory.service';

@Injectable()
export class VariationOptionUseCases {
  constructor(
    private dataService: IVariationOptionsDataSourceService,
    private variationOptionFactoryService: VariationOptionFactoryService,
  ) {}
  getVariationOptionsBy(
    term: string,
    fields: (keyof IVariationOption)[],
    paginationArgs: PaginationArgs,
  ) {
    return this.dataService.variationOptions.getVariationOptionsBy(
      term,
      fields,
      paginationArgs,
    );
  }
  getAllVariationOptions(args?: IGenericArgs<IVariationOption>) {
    return this.dataService.variationOptions.getAllVariationOptions(args);
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
