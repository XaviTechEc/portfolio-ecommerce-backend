import {
  CreateVariationOptionInput,
  UpdateVariationOptionInput,
} from 'src/core/dtos';
import { IGenericArgs } from '../../generic-args.repository';

export abstract class IVariationOptionsRepository<T> {
  abstract getAllVariationOptions(args?: IGenericArgs<T>): Promise<T[]>;
  abstract getOneVariationOptionBy(
    fields: Partial<T>,
    args?: IGenericArgs<T>,
  ): Promise<T>;
  abstract getVariationOptionById(id: string): Promise<T>;
  abstract createVariationOption(
    createVariationOptionInput: CreateVariationOptionInput,
  ): Promise<T>;
  abstract updateVariationOption(
    id: string,
    updateVariationOptionInput: UpdateVariationOptionInput,
  ): Promise<T>;
  abstract removeVariationOption(id: string): Promise<T>;
}
