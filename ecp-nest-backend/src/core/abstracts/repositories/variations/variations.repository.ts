import { IVariation } from 'src/core/entities';

export abstract class IVariations {
  abstract getAllVariations(): Promise<IVariation[]>;
  abstract getVariationById(id: string): Promise<IVariation>;
  abstract createVariation(createVariationInput: any): Promise<IVariation>;
  abstract updateVariation(updateVariationInput: any): Promise<IVariation>;
  abstract removeVariation(id: string): Promise<IVariation>;
}
