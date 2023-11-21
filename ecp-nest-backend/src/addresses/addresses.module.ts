import { Module } from '@nestjs/common';
import {
  AddressFactoryService,
  AddressesUseCases,
  CountryFactoryService,
  CountriesUseCases,
  LocationFactoryService,
  LocationsUseCases,
} from './application/use-cases';
import { AddressDataSourceModule } from './infrastructure/data/address-datasource.module';
import {
  AddressResolver,
  CountriesResolver,
  LocationsResolver,
} from './interface-adapters/graphql/resolvers';

@Module({
  imports: [AddressDataSourceModule],
  providers: [
    AddressesUseCases,
    CountriesUseCases,
    LocationsUseCases,
    AddressFactoryService,
    CountryFactoryService,
    LocationFactoryService,
    AddressResolver,
    CountriesResolver,
    LocationsResolver,
  ],
})
export class AddressesModule {}
