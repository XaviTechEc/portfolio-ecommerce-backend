import { IGenericArgs } from 'src/core/dtos/graphql/args/generic-args.repository';
import { IVariationsRepository } from 'src/core/abstracts/repositories';
import { CreateVariationInput, UpdateVariationInput } from 'src/core/dtos';
import { Repository } from 'typeorm';

export class VariationsRepository<T> implements IVariationsRepository<T> {
  private _repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this._repository = repository;
  }
  getAllVariations(args?: IGenericArgs<T>): Promise<T[]> {
    throw new Error('Method not implemented.');
  }
  getVariationById(id: string): Promise<T> {
    throw new Error('Method not implemented.');
  }
  createVariation(createVariationInput: CreateVariationInput): Promise<T> {
    throw new Error('Method not implemented.');
  }
  updateVariation(
    id: string,
    updateVariationInput: UpdateVariationInput,
  ): Promise<T> {
    throw new Error('Method not implemented.');
  }
  removeVariation(id: string): Promise<T> {
    throw new Error('Method not implemented.');
  }
}
