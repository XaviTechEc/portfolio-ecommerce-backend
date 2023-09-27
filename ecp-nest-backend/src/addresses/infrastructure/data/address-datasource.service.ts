import { InjectRepository } from '@nestjs/typeorm';
import {
  AddressesRepository,
  CountriesRepository,
  LocationsRepository,
} from './postgresql/repositories';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
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

    private _loggerService: ILoggerService,
    private _exceptionsService: IExceptionsService,
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
