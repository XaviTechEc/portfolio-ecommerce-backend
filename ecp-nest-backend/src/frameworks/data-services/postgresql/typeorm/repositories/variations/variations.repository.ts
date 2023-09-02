import { IGenericArgs } from 'src/core/dtos/graphql/args/generic-args.repository';
import { IVariationsRepository } from 'src/core/abstracts/repositories';
import { CreateVariationInput, UpdateVariationInput } from 'src/core/dtos';
import { Repository } from 'typeorm';
import { Variation } from '../../entities/outputs/entities';

export class VariationsRepository implements IVariationsRepository<Variation> {
  private _repository: Repository<Variation>;

  constructor(repository: Repository<Variation>) {
    this._repository = repository;
  }
  getAllVariations(args?: IGenericArgs<Variation>): Promise<Variation[]> {
    throw new Error('Method not implemented.');
  }
  getVariationById(id: string): Promise<Variation> {
    throw new Error('Method not implemented.');
  }
  createVariation(
    createVariationInput: CreateVariationInput,
  ): Promise<Variation> {
    throw new Error('Method not implemented.');
  }
  updateVariation(
    id: string,
    updateVariationInput: UpdateVariationInput,
  ): Promise<Variation> {
    throw new Error('Method not implemented.');
  }
  removeVariation(id: string): Promise<Variation> {
    throw new Error('Method not implemented.');
  }
}
