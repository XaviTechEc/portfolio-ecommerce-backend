import {
  IGenericArgs,
  PaginationArgs,
} from 'src/common/domain/dtos/graphql/args';
import {
  CreateVariationOptionInput,
  UpdateVariationOptionInput,
} from '../../dtos/graphql/inputs/variation-option.input';

export abstract class IVariationOptionsRepository<T> {
  abstract getAllVariationOptions(args?: IGenericArgs<T>): Promise<T[]>;
  abstract getVariationOptionsBy(
    term: string,
    fields: (keyof T)[],
    paginationArgs: PaginationArgs,
  ): Promise<T[]>;
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
