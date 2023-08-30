import { Injectable } from '@nestjs/common';
import { ICountriesRepository } from 'src/core/abstracts/repositories';
import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
import { ICountry } from 'src/core/entities';

import { CreateCountryInput, UpdateCountryInput } from 'src/core/dtos';
import { CountryFactoryService } from './factory/country-factory.service';
import { IGenericArgs } from 'src/core/abstracts/generic-args.repository';

@Injectable()
export class CountryUseCases implements ICountriesRepository<ICountry> {
  constructor(
    private dataService: IDataSourcesService,
    private countryFactoryService: CountryFactoryService,
  ) {}
  getAllCountries(args?: IGenericArgs<ICountry>): Promise<ICountry[]> {
    throw new Error('Method not implemented.');
  }
  getCountryById(id: string): Promise<ICountry> {
    throw new Error('Method not implemented.');
  }
  createCountry(createCountryInput: CreateCountryInput): Promise<ICountry> {
    throw new Error('Method not implemented.');
  }
  updateCountry(
    id: string,
    updateCountryInput: UpdateCountryInput,
  ): Promise<ICountry> {
    throw new Error('Method not implemented.');
  }
  removeCountry(id: string): Promise<ICountry> {
    throw new Error('Method not implemented.');
  }
}
