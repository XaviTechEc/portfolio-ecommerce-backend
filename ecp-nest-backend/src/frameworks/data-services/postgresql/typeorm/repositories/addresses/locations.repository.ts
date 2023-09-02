import { ILocationsRepository } from 'src/core/abstracts/repositories';
import { CreateLocationInput, UpdateLocationInput } from 'src/core/dtos';
import { Repository } from 'typeorm';

export class LocationsRepository<T> implements ILocationsRepository<T> {
  private _repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this._repository = repository;
  }

  getLocationById(id: string): Promise<T> {
    throw new Error('Method not implemented.');
  }
  createLocation(createLocationInput: CreateLocationInput): Promise<T> {
    throw new Error('Method not implemented.');
  }
  updateLocation(
    id: string,
    updateLocationInput: UpdateLocationInput,
  ): Promise<T> {
    throw new Error('Method not implemented.');
  }
  removeLocation(id: string): Promise<T> {
    throw new Error('Method not implemented.');
  }
}
