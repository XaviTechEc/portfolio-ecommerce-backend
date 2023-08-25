import { CreateLocationInput, UpdateLocationInput } from 'src/core/dtos';
import { ILocation } from 'src/core/entities';

export abstract class ILocationsRepository {
  abstract getLocationById(id: string): Promise<ILocation>;
  abstract createLocation(
    createLocationInput: CreateLocationInput,
  ): Promise<ILocation>;
  abstract updateLocation(
    id: string,
    updateLocationInput: UpdateLocationInput,
  ): Promise<ILocation>;
  abstract removeLocation(id: string): Promise<ILocation>;
}
