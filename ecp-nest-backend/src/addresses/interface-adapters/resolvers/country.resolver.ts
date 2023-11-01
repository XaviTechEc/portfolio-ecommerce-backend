import { ParseUUIDPipe } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CountryUseCases } from 'src/addresses/application/use-cases';
import {
  CreateCountryInput,
  UpdateCountryInput,
} from 'src/addresses/domain/dtos/graphql/inputs/country.input';
import { CountryType } from 'src/addresses/domain/object-types/country.type';
import {
  PaginationArgs,
  SearchArgs,
} from 'src/common/domain/dtos/graphql/args';

@Resolver(() => CountryType)
export class CountryResolver {
  constructor(private countryUseCases: CountryUseCases) {}

  @Query(() => [CountryType], { name: 'countries' })
  getAllCountries(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ) {
    return this.countryUseCases.getAllCountries({ paginationArgs, searchArgs });
  }

  @Query(() => CountryType, { name: 'country' })
  getCountryById(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string) {
    return this.countryUseCases.getCountryById(id);
  }

  @Mutation(() => CountryType)
  createCountry(
    @Args('createCountryInput') createCountryInput: CreateCountryInput,
  ) {
    return this.countryUseCases.createCountry(createCountryInput);
  }

  @Mutation(() => CountryType)
  updateCountry(
    @Args('updateCountryInput') updateCountryInput: UpdateCountryInput,
  ) {
    return this.countryUseCases.updateCountry(
      updateCountryInput.id,
      updateCountryInput,
    );
  }

  @Mutation(() => CountryType)
  removeCountry(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string) {
    return this.countryUseCases.removeCountry(id);
  }
}
