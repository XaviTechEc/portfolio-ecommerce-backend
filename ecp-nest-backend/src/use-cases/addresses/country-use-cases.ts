import { Injectable } from '@nestjs/common';
import { ICountriesRepository } from 'src/core/abstracts/repositories';
import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
import { ICountry } from 'src/core/entities';

import { CreateCountryInput, UpdateCountryInput } from 'src/core/dtos';
import { CountryFactoryService } from './factory/country-factory.service';
import { IGenericArgs } from 'src/core/dtos/graphql/args/generic-args.repository';

@Injectable()
export class CountryUseCases implements ICountriesRepository<ICountry> {
  constructor(
    private dataService: IDataSourcesService,
    private countryFactoryService: CountryFactoryService,
  ) {}
  getAllCountries(args?: IGenericArgs<ICountry>): Promise<ICountry[]> {
    return this.dataService.countries.getAllCountries(args);
  }
  getCountryById(id: string): Promise<ICountry> {
    return this.dataService.countries.getCountryById(id);
  }
  createCountry(createCountryInput: CreateCountryInput): Promise<ICountry> {
    const country =
      this.countryFactoryService.createCountry(createCountryInput);
    return this.dataService.countries.createCountry(country);
  }
  updateCountry(
    id: string,
    updateCountryInput: UpdateCountryInput,
  ): Promise<ICountry> {
    return this.dataService.countries.updateCountry(id, updateCountryInput);
  }
  removeCountry(id: string): Promise<ICountry> {
    return this.dataService.countries.removeCountry(id);
  }
}
