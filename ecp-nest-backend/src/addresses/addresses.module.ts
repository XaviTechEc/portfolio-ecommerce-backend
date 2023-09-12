import { Module } from '@nestjs/common';
import {
  AddressFactoryService,
  AddressesUseCases,
  CountryFactoryService,
  CountryUseCases,
  LocationFactoryService,
  LocationUseCases,
} from './application/use-cases';
import { AddressDataSourceModule } from './infrastructure/data/address-datasource.module';
import {
  AddressResolver,
  CountryResolver,
  LocationResolver,
} from './interface-adapters/resolvers';

@Module({
  imports: [AddressDataSourceModule],
  providers: [
    AddressesUseCases,
    CountryUseCases,
    LocationUseCases,
    AddressFactoryService,
    CountryFactoryService,
    LocationFactoryService,
    AddressResolver,
    CountryResolver,
    LocationResolver,
  ],
})
export class AddressesModule {}
