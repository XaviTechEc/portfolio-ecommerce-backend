import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { ICountry } from './country.entity';
import { ILocation } from './location.entity';

export class IAddress extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  id: string;
  unitNumber?: number;
  streetNumber?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  region?: string;
  postalCode: string;
  reference?: string;
  country: ICountry;
  location?: ILocation;
}
