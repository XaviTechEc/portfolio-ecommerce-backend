import { Injectable } from '@nestjs/common';
import { ICountriesRepository } from 'src/core/abstracts/repositories';
import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
import { ICountry } from 'src/core/entities';

import { CreateCountryInput, UpdateCountryInput } from 'src/core/dtos';
import { CountryFactoryService } from './factory/country-factory.service';

@Injectable()
export class CountryUseCases implements ICountriesRepository {
  constructor(
    private dataService: IDataSourcesService,
    private countryFactoryService: CountryFactoryService,
  ) {}

  getAllCountries(): Promise<ICountry[]> {
    return this.dataService.countries.getAll();
  }

  getCountryById(id: string): Promise<ICountry> {
    return this.dataService.countries.getOneById(id);
  }

  createCountry(createCountryInput: CreateCountryInput): Promise<ICountry> {
    const country =
      this.countryFactoryService.createCountry(createCountryInput);
    return this.dataService.countries.create(country);
  }

  updateCountry(
    id: string,
    updateCountryInput: UpdateCountryInput,
  ): Promise<ICountry> {
    const country =
      this.countryFactoryService.updateCountry(updateCountryInput);
    return this.dataService.countries.updateOneById(id, country);
  }

  removeCountry(id: string): Promise<ICountry> {
    return this.dataService.countries.deleteOneById(id);
  }
}
