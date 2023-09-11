import { Injectable } from '@nestjs/common';
import { IDataSourcesService } from 'src/common/domain/abstracts/services';
import {
  PaginationArgs,
  IGenericArgs,
} from 'src/common/domain/dtos/graphql/args';
import { IVariationOptionsRepository } from 'src/variation-options/domain/abstracts/repositories/variation-options.repository';
import {
  CreateVariationOptionInput,
  UpdateVariationOptionInput,
} from 'src/variation-options/domain/dtos/graphql/inputs/variation-option.input';
import { IVariationOption } from 'src/variation-options/domain/entities/variation-option.entity';
import { VariationOptionFactoryService } from './factory/variation-option-factory.service';

@Injectable()
export class VariationOptionUseCases
  implements IVariationOptionsRepository<IVariationOption>
{
  constructor(
    private dataService: IDataSourcesService,
    private variationOptionFactoryService: VariationOptionFactoryService,
  ) {}
  getVariationOptionsBy(
    term: string,
    fields: (keyof IVariationOption)[],
    paginationArgs: PaginationArgs,
  ): Promise<IVariationOption[]> {
    return this.dataService.variationOptions.getVariationOptionsBy(
      term,
      fields,
      paginationArgs,
    );
  }
  getAllVariationOptions(
    args?: IGenericArgs<IVariationOption>,
  ): Promise<IVariationOption[]> {
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
