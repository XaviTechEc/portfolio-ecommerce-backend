import { ICountry } from 'src/core/entities';

export abstract class ICountriesRepository {
  abstract getAllCountries(): Promise<ICountry[]>;
  abstract getCountryById(id: string): Promise<ICountry>;
  abstract createCountry(createCountryInput: any): Promise<ICountry>;
  abstract updateCountry(updateCountryInput: any): Promise<ICountry>;
  abstract removeCountry(id: string): Promise<ICountry>;
}
