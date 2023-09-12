import { InjectRepository } from '@nestjs/typeorm';
import {
  AddressesRepository,
  CountriesRepository,
  LocationsRepository,
} from './postgresql/repositories';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ExceptionsService } from 'src/common/infrastructure/exceptions/exceptions.service';
import { MyLoggerService } from 'src/common/infrastructure/logger/logger.service';
import { Repository } from 'typeorm';
import { Address, Country, Location } from './postgresql/entities';
import { IAddressDataSourceService } from 'src/addresses/domain/abstracts/services/address-datasource.abstract.service';

@Injectable()
export class AddressDataSourceService
  implements IAddressDataSourceService, OnApplicationBootstrap
{
  // Addresses
  addresses: AddressesRepository;
  countries: CountriesRepository;
  locations: LocationsRepository;

  constructor(
    // Addresses
    @InjectRepository(Address)
    private addressesRepository: Repository<Address>,
    @InjectRepository(Country)
    private countriesRepository: Repository<Country>,
    @InjectRepository(Location)
    private locationsRepository: Repository<Location>,

    private _loggerService: MyLoggerService,
    private _exceptionsService: ExceptionsService,
  ) {}
  onApplicationBootstrap() {
    // Addresses
    this.addresses = new AddressesRepository(
      this.addressesRepository,
      this._loggerService,
      this._exceptionsService,
    );
    this.countries = new CountriesRepository(
      this.countriesRepository,
      this._loggerService,
      this._exceptionsService,
    );
    this.locations = new LocationsRepository(
      this.locationsRepository,
      this._loggerService,
      this._exceptionsService,
    );
  }
}
