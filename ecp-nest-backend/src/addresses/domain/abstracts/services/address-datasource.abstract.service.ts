import { IAddress } from '../../entities/address.entity';
import { ICountry } from '../../entities/country.entity';
import { ILocation } from '../../entities/location.entity';
import { IAddressesRepository } from '../repositories/addresses.repository';
import { ICountriesRepository } from '../repositories/countries.repository';
import { ILocationsRepository } from '../repositories/locations.repository';

export abstract class IAddressDataSourceService {
  // Address
  abstract addresses: IAddressesRepository<IAddress>;
  abstract countries: ICountriesRepository<ICountry>;
  abstract locations: ILocationsRepository<ILocation>;
}
