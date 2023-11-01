import { IGenericArgs } from 'src/common/domain/dtos/graphql/args';
import {
  CreateCountryInput,
  UpdateCountryInput,
} from '../../dtos/graphql/inputs/country.input';
import { GetAllGenericResponse } from 'src/common/domain/interfaces/responses/get-all-generic-response.interface';

export abstract class ICountriesRepository<T> {
  abstract getAllCountries(
    args?: IGenericArgs<T>,
  ): Promise<GetAllGenericResponse<T>>;
  abstract getCountryById(id: string): Promise<T>;
  abstract createCountry(createCountryInput: CreateCountryInput): Promise<T>;
  abstract updateCountry(
    id: string,
    updateCountryInput: UpdateCountryInput,
  ): Promise<T>;
  abstract removeCountry(id: string): Promise<T>;
}
