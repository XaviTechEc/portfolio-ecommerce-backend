import { ILocationsRepository } from 'src/core/abstracts/repositories';
import { CreateLocationInput, UpdateLocationInput } from 'src/core/dtos';
import { Repository } from 'typeorm';
import { Location } from '../../entities/outputs/entities';

export class LocationsRepository implements ILocationsRepository<Location> {
  private _repository: Repository<Location>;

  constructor(repository: Repository<Location>) {
    this._repository = repository;
  }
  getLocationById(id: string): Promise<Location> {
    throw new Error('Method not implemented.');
  }
  createLocation(createLocationInput: CreateLocationInput): Promise<Location> {
    throw new Error('Method not implemented.');
  }
  updateLocation(
    id: string,
    updateLocationInput: UpdateLocationInput,
  ): Promise<Location> {
    throw new Error('Method not implemented.');
  }
  removeLocation(id: string): Promise<Location> {
    throw new Error('Method not implemented.');
  }
}
