import {
  IGenericArgs,
  PaginationArgs,
} from 'src/common/domain/dtos/graphql/args';
import {
  CreateVariationInput,
  UpdateVariationInput,
} from '../../dtos/graphql/inputs/variation.input';

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
  abstract getVariationsBy(
    term: string,
    fields: (keyof T)[],
    paginationArgs: PaginationArgs,
  ): Promise<T[]>;
}
