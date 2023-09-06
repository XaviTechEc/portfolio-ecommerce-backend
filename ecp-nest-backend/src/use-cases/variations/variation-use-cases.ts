import { Injectable } from '@nestjs/common';
import { IVariationsRepository } from 'src/core/abstracts/repositories';
import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
import {
  CreateVariationInput,
  PaginationArgs,
  UpdateVariationInput,
} from 'src/core/dtos';
import { IVariation } from 'src/core/entities';
import { VariationFactoryService } from './factory/variation-factory.service';
import { IGenericArgs } from 'src/core/dtos/graphql/args/generic-args.repository';

@Injectable()
export class VariationUseCases implements IVariationsRepository<IVariation> {
  constructor(
    private dataService: IDataSourcesService,
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
