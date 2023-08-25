import { Injectable } from '@nestjs/common';
import { IVariationsRepository } from 'src/core/abstracts/repositories';
import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
import { CreateVariationInput, UpdateVariationInput } from 'src/core/dtos';
import { IVariation } from 'src/core/entities';
import { VariationFactoryService } from './factory/variation-factory.service';

@Injectable()
export class VariationUseCases implements IVariationsRepository {
  constructor(
    private dataService: IDataSourcesService,
    private variationFactoryService: VariationFactoryService,
  ) {}

  getAllVariations(): Promise<IVariation[]> {
    return this.dataService.variations.getAll();
  }

  getVariationById(id: string): Promise<IVariation> {
    return this.dataService.variations.getOneById(id);
  }

  createVariation(
    createVariationInput: CreateVariationInput,
  ): Promise<IVariation> {
    const variation =
      this.variationFactoryService.createVariation(createVariationInput);
    return this.dataService.variations.create(variation);
  }

  updateVariation(
    id: string,
    updateVariationInput: UpdateVariationInput,
  ): Promise<IVariation> {
    const variation =
      this.variationFactoryService.updateVariation(updateVariationInput);
    return this.dataService.variations.updateOneById(id, variation);
  }

  removeVariation(id: string): Promise<IVariation> {
    return this.dataService.variations.deleteOneById(id);
  }
}
