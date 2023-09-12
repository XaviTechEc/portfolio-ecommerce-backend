import { Injectable } from '@nestjs/common';
import {
  IGenericArgs,
  PaginationArgs,
} from 'src/common/domain/dtos/graphql/args';
import { IVariationsRepository } from 'src/variations/domain/abstracts/repositories/variations.repository';
import { IVariationsDataSourceService } from 'src/variations/domain/abstracts/services/variations-datasource.abstract.service';
import {
  CreateVariationInput,
  UpdateVariationInput,
} from 'src/variations/domain/dtos/graphql/inputs/variation.input';
import { IVariation } from 'src/variations/domain/entities/variation.entity';
import { VariationFactoryService } from './factory/variation-factory.service';

@Injectable()
export class VariationUseCases implements IVariationsRepository<IVariation> {
  constructor(
    private dataService: IVariationsDataSourceService,
    private variationFactoryService: VariationFactoryService,
  ) {}
  getVariationsBy(
    term: string,
    fields: (keyof IVariation)[],
    paginationArgs: PaginationArgs,
  ): Promise<IVariation[]> {
    return this.dataService.variations.getVariationsBy(
      term,
      fields,
      paginationArgs,
    );
  }
  getAllVariations(args?: IGenericArgs<IVariation>): Promise<IVariation[]> {
    return this.dataService.variations.getAllVariations(args);
  }
  getVariationById(id: string): Promise<IVariation> {
    return this.dataService.variations.getVariationById(id);
  }
  createVariation(
    createVariationInput: CreateVariationInput,
  ): Promise<IVariation> {
    const variation =
      this.variationFactoryService.createVariation(createVariationInput);
    return this.dataService.variations.createVariation(variation);
  }
  updateVariation(
    id: string,
    updateVariationInput: UpdateVariationInput,
  ): Promise<IVariation> {
    const variation =
      this.variationFactoryService.updateVariation(updateVariationInput);
    return this.dataService.variations.updateVariation(id, variation);
  }
  removeVariation(id: string): Promise<IVariation> {
    return this.dataService.variations.removeVariation(id);
  }
}
