import { ILocation } from 'src/core/entities';

export abstract class ILocationsRepository {
  abstract getLocationById(id: string): Promise<ILocation>;
  abstract createLocation(createLocationInput: any): Promise<ILocation>;
  abstract updateLocation(updateLocationInput: any): Promise<ILocation>;
  abstract removeLocation(id: string): Promise<ILocation>;
}
