import { IGenericArgs } from 'src/core/abstracts/generic-args.repository';
import { ICountriesRepository } from 'src/core/abstracts/repositories';
import { CreateCountryInput, UpdateCountryInput } from 'src/core/dtos';
import { Repository } from 'typeorm';

export class CountriesRepository<T> implements ICountriesRepository<T> {
  private _repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this._repository = repository;
  }

  getAllCountries(args?: IGenericArgs<T>): Promise<T[]> {
    throw new Error('Method not implemented.');
  }
  getCountryById(id: string): Promise<T> {
    throw new Error('Method not implemented.');
  }
  createCountry(createCountryInput: CreateCountryInput): Promise<T> {
    throw new Error('Method not implemented.');
  }
  updateCountry(
    id: string,
    updateCountryInput: UpdateCountryInput,
  ): Promise<T> {
    throw new Error('Method not implemented.');
  }
  removeCountry(id: string): Promise<T> {
    throw new Error('Method not implemented.');
  }
}
