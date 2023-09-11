import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AddressFactoryService,
  AddressesUseCases,
  CountryFactoryService,
  CountryUseCases,
  LocationFactoryService,
  LocationUseCases,
} from './application/use-cases';
import {
  AddressResolver,
  CountryResolver,
  LocationResolver,
} from './interface-adapters/resolvers';
import { AddressDatasourceModule } from './infrastructure/data/address-datasource.module';

@Module({
  imports: [AddressDatasourceModule],
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
  exports: [TypeOrmModule],
})
export class AddressesModule {}
