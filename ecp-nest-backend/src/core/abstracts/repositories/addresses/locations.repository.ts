import { CreateLocationInput, UpdateLocationInput } from 'src/core/dtos';

export abstract class ILocationsRepository<T> {
  abstract getLocationById(id: string): Promise<T>;
  abstract createLocation(createLocationInput: CreateLocationInput): Promise<T>;
  abstract updateLocation(
    id: string,
    updateLocationInput: UpdateLocationInput,
  ): Promise<T>;
  abstract removeLocation(id: string): Promise<T>;
}
