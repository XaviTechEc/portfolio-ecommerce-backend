import { Module } from '@nestjs/common';
import { DataServicesModule } from 'src/services/data-services/data-services.module';
import { AddressesUseCases } from './address-use-cases';
import { CountryUseCases } from './country-use-cases';
import {
  AddressFactoryService,
  CountryFactoryService,
  LocationFactoryService,
} from './factory';
import { LocationUseCases } from './location-use-cases';

@Module({
  imports: [DataServicesModule],
  exports: [
    AddressFactoryService,
    AddressesUseCases,
    CountryFactoryService,
    CountryUseCases,
    LocationFactoryService,
    LocationUseCases,
  ],
  providers: [
    AddressFactoryService,
    AddressesUseCases,
    CountryFactoryService,
    CountryUseCases,
    LocationFactoryService,
    LocationUseCases,
  ],
})
export class AddressesUseCaseModule {}
