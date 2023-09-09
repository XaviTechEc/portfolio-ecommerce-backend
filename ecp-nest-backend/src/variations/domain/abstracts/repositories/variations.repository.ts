import {
  IGenericArgs,
  CreateVariationInput,
  UpdateVariationInput,
  PaginationArgs,
} from 'src/core/dtos';

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
