import { CreateVariationInput, UpdateVariationInput } from 'src/core/dtos';
import { IVariation } from 'src/core/entities';

export abstract class IVariationsRepository {
  abstract getAllVariations(): Promise<IVariation[]>;
  abstract getVariationById(id: string): Promise<IVariation>;
  abstract createVariation(
    createVariationInput: CreateVariationInput,
  ): Promise<IVariation>;
  abstract updateVariation(
    id: string,
    updateVariationInput: UpdateVariationInput,
  ): Promise<IVariation>;
  abstract removeVariation(id: string): Promise<IVariation>;
}
