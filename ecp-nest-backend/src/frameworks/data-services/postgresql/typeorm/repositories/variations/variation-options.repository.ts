import { IGenericArgs } from 'src/core/dtos/graphql/args/generic-args.repository';
import { IVariationOptionsRepository } from 'src/core/abstracts/repositories';
import {
  CreateVariationOptionInput,
  UpdateVariationOptionInput,
} from 'src/core/dtos';
import { Repository } from 'typeorm';
import { VariationOption } from '../../entities/outputs/entities';

export class VariationOptionsRepository
  implements IVariationOptionsRepository<VariationOption>
{
  private _repository: Repository<VariationOption>;

  constructor(repository: Repository<VariationOption>) {
    this._repository = repository;
  }
  getAllVariationOptions(
    args?: IGenericArgs<VariationOption>,
  ): Promise<VariationOption[]> {
    throw new Error('Method not implemented.');
  }
  getOneVariationOptionBy(
    fields: Partial<VariationOption>,
    args?: IGenericArgs<VariationOption>,
  ): Promise<VariationOption> {
    throw new Error('Method not implemented.');
  }
  getVariationOptionById(id: string): Promise<VariationOption> {
    throw new Error('Method not implemented.');
  }
  createVariationOption(
    createVariationOptionInput: CreateVariationOptionInput,
  ): Promise<VariationOption> {
    throw new Error('Method not implemented.');
  }
  updateVariationOption(
    id: string,
    updateVariationOptionInput: UpdateVariationOptionInput,
  ): Promise<VariationOption> {
    throw new Error('Method not implemented.');
  }
  removeVariationOption(id: string): Promise<VariationOption> {
    throw new Error('Method not implemented.');
  }
}
