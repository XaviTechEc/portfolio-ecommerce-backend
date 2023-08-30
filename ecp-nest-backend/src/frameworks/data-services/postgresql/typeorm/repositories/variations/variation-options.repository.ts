import { IGenericArgs } from 'src/core/abstracts/generic-args.repository';
import { IVariationOptionsRepository } from 'src/core/abstracts/repositories';
import {
  CreateVariationOptionInput,
  UpdateVariationOptionInput,
} from 'src/core/dtos';
import { Repository } from 'typeorm';

export class VariationOptionsRepository<T>
  implements IVariationOptionsRepository<T>
{
  private _repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this._repository = repository;
  }
  getAllVariationOptions(args?: IGenericArgs<T>): Promise<T[]> {
    throw new Error('Method not implemented.');
  }
  getOneVariationOptionBy(
    fields: Partial<T>,
    args?: IGenericArgs<T>,
  ): Promise<T> {
    throw new Error('Method not implemented.');
  }
  getVariationOptionById(id: string): Promise<T> {
    throw new Error('Method not implemented.');
  }
  createVariationOption(
    createVariationOptionInput: CreateVariationOptionInput,
  ): Promise<T> {
    throw new Error('Method not implemented.');
  }
  updateVariationOption(
    id: string,
    updateVariationOptionInput: UpdateVariationOptionInput,
  ): Promise<T> {
    throw new Error('Method not implemented.');
  }
  removeVariationOption(id: string): Promise<T> {
    throw new Error('Method not implemented.');
  }
}
