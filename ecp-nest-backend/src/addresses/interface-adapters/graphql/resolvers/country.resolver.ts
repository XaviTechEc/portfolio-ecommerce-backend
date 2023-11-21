import { Resolver } from '@nestjs/graphql';
import { CountriesUseCases } from 'src/addresses/application/use-cases';
import {
  CreateCountryInput,
  UpdateCountryInput,
} from 'src/addresses/domain/dtos/graphql/inputs/country.input';
import { CountryType } from 'src/addresses/interface-adapters/graphql/object-types/country.type';
import { BaseResolver } from 'src/common/interface-adapters/graphql/resolvers/base-resolver.resolver';

@Resolver(() => CountryType)
export class CountriesResolver extends BaseResolver(CountryType, {
  useCasesRef: CountriesUseCases,
  createInputRef: CreateCountryInput,
  updateInputRef: UpdateCountryInput,
}) {
  constructor(private countriesUseCases: CountriesUseCases) {
    super(countriesUseCases);
  }
}
