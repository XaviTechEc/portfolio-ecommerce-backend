import { IGenericArgs } from 'src/core/dtos/graphql/args/generic-args.repository';
import { ICountriesRepository } from 'src/core/abstracts/repositories';
import { CreateCountryInput, UpdateCountryInput } from 'src/core/dtos';
import { Repository } from 'typeorm';
import { Country } from '../../entities/outputs/entities';

export class CountriesRepository implements ICountriesRepository<Country> {
  private _repository: Repository<Country>;

  constructor(repository: Repository<Country>) {
    this._repository = repository;
  }
  getAllCountries(args?: IGenericArgs<Country>): Promise<Country[]> {
    throw new Error('Method not implemented.');
  }
  getCountryById(id: string): Promise<Country> {
    throw new Error('Method not implemented.');
  }
  createCountry(createCountryInput: CreateCountryInput): Promise<Country> {
    throw new Error('Method not implemented.');
  }
  updateCountry(
    id: string,
    updateCountryInput: UpdateCountryInput,
  ): Promise<Country> {
    throw new Error('Method not implemented.');
  }
  removeCountry(id: string): Promise<Country> {
    throw new Error('Method not implemented.');
  }
}
