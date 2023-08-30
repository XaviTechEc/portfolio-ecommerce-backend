export class IAddress {
  id: string;
  unitNumber?: number;
  streetNumber?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  region?: string;
  postalCode: string;
  countryId: string;
  reference?: string;
  locationId?: string;
}
