import { IVariationOption } from 'src/core/entities';

export abstract class IVariationOptions {
  abstract getAllVariationOptions(): Promise<IVariationOption[]>;
  abstract getVariationOptionById(id: string): Promise<IVariationOption>;
  abstract getVariationOptionsBy(
    fields: Partial<IVariationOption>,
  ): Promise<IVariationOption>;
  abstract createVariationOption(
    createVariationOptionInput: any,
  ): Promise<IVariationOption>;
  abstract updateVariationOption(
    updateVariationOptionInput: any,
  ): Promise<IVariationOption>;
  abstract removeVariationOption(id: string): Promise<IVariationOption>;
}
