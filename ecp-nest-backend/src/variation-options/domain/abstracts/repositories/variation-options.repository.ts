import {
  IGenericArgs,
  PaginationArgs,
} from 'src/common/domain/dtos/graphql/args';
import {
  CreateVariationOptionInput,
  UpdateVariationOptionInput,
} from '../../dtos/graphql/inputs/variation-option.input';
import { GetAllGenericResponse } from 'src/common/domain/interfaces/responses/get-all-generic-response.interface';

export abstract class IVariationOptionsRepository<T> {
  abstract getAllVariationOptions(
    args?: IGenericArgs<T>,
  ): Promise<GetAllGenericResponse<T>>;
  abstract getVariationOptionsBy(
    term: string,
    fields: (keyof T)[],
    paginationArgs: PaginationArgs,
  ): Promise<GetAllGenericResponse<T>>;
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
