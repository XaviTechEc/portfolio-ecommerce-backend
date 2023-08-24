import { ICountry } from './country.entity';
import { ILocation } from './location.entity';

export class IAddress {
  id: string;
  unitNumber: number;
  streetNumber?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  region: string;
  postalCode: string;
  country: ICountry;
  reference: string;
  location: ILocation;
}
