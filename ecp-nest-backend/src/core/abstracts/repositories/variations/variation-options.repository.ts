import {
  CreateVariationOptionInput,
  UpdateVariationOptionInput,
} from 'src/core/dtos';
import { IVariationOption } from 'src/core/entities';

export abstract class IVariationOptionsRepository {
  abstract getAllVariationOptions(): Promise<IVariationOption[]>;
  abstract getVariationOptionById(id: string): Promise<IVariationOption>;
  abstract getOneVariationOptionBy(
    fields: Partial<IVariationOption>,
  ): Promise<IVariationOption>;
  abstract createVariationOption(
    createVariationOptionInput: CreateVariationOptionInput,
  ): Promise<IVariationOption>;
  abstract updateVariationOption(
    id: string,
    updateVariationOptionInput: UpdateVariationOptionInput,
  ): Promise<IVariationOption>;
  abstract removeVariationOption(id: string): Promise<IVariationOption>;
}
