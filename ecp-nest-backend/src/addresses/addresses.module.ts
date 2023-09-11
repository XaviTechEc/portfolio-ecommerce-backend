import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AddressesUseCases,
  CountryUseCases,
  LocationUseCases,
  AddressFactoryService,
  CountryFactoryService,
  LocationFactoryService,
} from './application/use-cases';
import {
  Address,
  Country,
  Location,
} from './infrastructure/data/postgresql/entities';
import {
  AddressResolver,
  CountryResolver,
  LocationResolver,
} from './interface-adapters/resolvers';

@Module({
  imports: [TypeOrmModule.forFeature([Address, Country, Location])],
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
