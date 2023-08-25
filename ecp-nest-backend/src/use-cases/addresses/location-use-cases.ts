import { Injectable } from '@nestjs/common';
import { ILocationsRepository } from 'src/core/abstracts/repositories';
import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
import { ILocation } from 'src/core/entities';
import { LocationFactoryService } from './location-factory.service';
import { CreateLocationInput, UpdateLocationInput } from 'src/core/dtos';

@Injectable()
export class LocationUseCases implements ILocationsRepository {
  constructor(
    private dataService: IDataSourcesService,
    private locationFactoryService: LocationFactoryService,
  ) {}

  getLocationById(id: string): Promise<ILocation> {
    return this.dataService.locations.getOneById(id);
  }

  createLocation(createLocationInput: CreateLocationInput): Promise<ILocation> {
    const location =
      this.locationFactoryService.createLocation(createLocationInput);
    return this.dataService.locations.create(location);
  }

  updateLocation(
    id: string,
    updateLocationInput: UpdateLocationInput,
  ): Promise<ILocation> {
    const location =
      this.locationFactoryService.updateLocation(updateLocationInput);
    return this.dataService.locations.updateOneById(id, location);
  }

  removeLocation(id: string): Promise<ILocation> {
    return this.dataService.locations.deleteOneById(id);
  }
}
