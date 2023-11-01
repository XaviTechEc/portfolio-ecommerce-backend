import { Injectable } from '@nestjs/common';
import { IAddressDataSourceService } from 'src/addresses/domain/abstracts/services/address-datasource.abstract.service';
import {
  CreateCountryInput,
  UpdateCountryInput,
} from 'src/addresses/domain/dtos/graphql/inputs/country.input';
import { ICountry } from 'src/addresses/domain/entities/country.entity';
import { IGenericArgs } from 'src/common/domain/dtos/graphql/args';
import { CountryFactoryService } from './factory';

@Injectable()
export class CountryUseCases {
  constructor(
    private dataService: IAddressDataSourceService,
    private countryFactoryService: CountryFactoryService,
  ) {}
  getAllCountries(args?: IGenericArgs<ICountry>) {
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
