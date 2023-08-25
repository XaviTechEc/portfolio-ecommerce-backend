import { CreateCountryInput, UpdateCountryInput } from 'src/core/dtos';
import { ICountry } from 'src/core/entities';

export abstract class ICountriesRepository {
  abstract getAllCountries(): Promise<ICountry[]>;
  abstract getCountryById(id: string): Promise<ICountry>;
  abstract createCountry(
    createCountryInput: CreateCountryInput,
  ): Promise<ICountry>;
  abstract updateCountry(
    id: string,
    updateCountryInput: UpdateCountryInput,
  ): Promise<ICountry>;
  abstract removeCountry(id: string): Promise<ICountry>;
}
