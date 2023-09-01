import { Injectable } from '@nestjs/common';
import { IVariationsRepository } from 'src/core/abstracts/repositories';
import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
import { CreateVariationInput, UpdateVariationInput } from 'src/core/dtos';
import { IVariation } from 'src/core/entities';
import { VariationFactoryService } from './factory/variation-factory.service';
import { IGenericArgs } from 'src/core/dtos/graphql/args/generic-args.repository';

@Injectable()
export class VariationUseCases implements IVariationsRepository<IVariation> {
  constructor(
    private dataService: IDataSourcesService,
    private variationFactoryService: VariationFactoryService,
  ) {}
  getAllVariations(args?: IGenericArgs<IVariation>): Promise<IVariation[]> {
    throw new Error('Method not implemented.');
  }
  getVariationById(id: string): Promise<IVariation> {
    throw new Error('Method not implemented.');
  }
  createVariation(
    createVariationInput: CreateVariationInput,
  ): Promise<IVariation> {
    throw new Error('Method not implemented.');
  }
  updateVariation(
    id: string,
    updateVariationInput: UpdateVariationInput,
  ): Promise<IVariation> {
    throw new Error('Method not implemented.');
  }
  removeVariation(id: string): Promise<IVariation> {
    throw new Error('Method not implemented.');
  }
}
