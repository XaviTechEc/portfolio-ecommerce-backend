import { CreateVariationInput, UpdateVariationInput } from 'src/core/dtos';
import { IGenericArgs } from '../../generic-args.repository';

export abstract class IVariationsRepository<T> {
  abstract getAllVariations(args?: IGenericArgs<T>): Promise<T[]>;
  abstract getVariationById(id: string): Promise<T>;
  abstract createVariation(
    createVariationInput: CreateVariationInput,
  ): Promise<T>;
  abstract updateVariation(
    id: string,
    updateVariationInput: UpdateVariationInput,
  ): Promise<T>;
  abstract removeVariation(id: string): Promise<T>;
}
