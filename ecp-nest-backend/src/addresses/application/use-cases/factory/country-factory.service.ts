import { Injectable } from '@nestjs/common';
import {
  CreateCountryInput,
  UpdateCountryInput,
} from 'src/addresses/domain/dtos/graphql/inputs/country.input';
import { ICountry } from 'src/addresses/domain/entities/country.entity';

@Injectable()
export class CountryFactoryService {
  createCountry(createCountryInput: CreateCountryInput): ICountry {
    const newCountry = new ICountry();
    newCountry.code = createCountryInput.code;
    newCountry.longName = createCountryInput.longName;
    return newCountry;
  }

  updateCountry(updateCountryInput: UpdateCountryInput): ICountry {
    const newCountry = new ICountry();
    newCountry.code = updateCountryInput.code;
    newCountry.longName = updateCountryInput.longName;
    return newCountry;
  }
}
