import { Module } from '@nestjs/common';
import { AddressFactoryService } from './factory/address-factory.service';
import { AddressesUseCases } from './address-use-cases';
import { DataServicesModule } from 'src/services/data-services/data-services.module';
import { CountryFactoryService } from './country-factory.service';
import { CountryUseCases } from './country-use-cases';
import { LocationFactoryService } from './location-factory.service';
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
