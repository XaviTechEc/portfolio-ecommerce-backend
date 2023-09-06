import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreateCountryInput,
  PaginationArgs,
  SearchArgs,
  UpdateCountryInput,
} from 'src/core/dtos';
import { ICountry } from 'src/core/entities';
import { CountryType } from 'src/core/object-types';
import { CountryUseCases } from 'src/use-cases';
import { ParseUUIDPipe } from '@nestjs/common';

@Resolver(() => CountryType)
export class CountryResolver {
  constructor(private countryUseCases: CountryUseCases) {}

  @Query(() => [CountryType], { name: 'countries' })
  getAllCountries(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ): Promise<ICountry[]> {
    return this.countryUseCases.getAllCountries({ paginationArgs, searchArgs });
  }

  @Query(() => CountryType, { name: 'country' })
  getCountryById(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<ICountry> {
    return this.countryUseCases.getCountryById(id);
  }

  @Mutation(() => CountryType)
  createCountry(
    @Args() createCountryInput: CreateCountryInput,
  ): Promise<ICountry> {
    return this.countryUseCases.createCountry(createCountryInput);
  }

  @Mutation(() => CountryType)
  updateCountry(
    @Args() updateCountryInput: UpdateCountryInput,
  ): Promise<ICountry> {
    return this.countryUseCases.updateCountry(
      updateCountryInput.id,
      updateCountryInput,
    );
  }

  @Mutation(() => CountryType)
  removeCountry(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<ICountry> {
    return this.countryUseCases.removeCountry(id);
  }
}
