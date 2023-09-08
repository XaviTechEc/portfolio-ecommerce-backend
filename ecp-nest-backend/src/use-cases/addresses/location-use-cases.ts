import { Injectable } from '@nestjs/common';
import { ILocationsRepository } from 'src/core/abstracts/repositories';
import { IDataSourcesService } from 'src/core/abstracts/services/data-services/data-sources.service';
import { ILocation } from 'src/core/entities';

import { CreateLocationInput, UpdateLocationInput } from 'src/core/dtos';
import { LocationFactoryService } from './factory/location-factory.service';

@Injectable()
export class LocationUseCases implements ILocationsRepository<ILocation> {
  constructor(
    private dataService: IDataSourcesService,
    private locationFactoryService: LocationFactoryService,
  ) {}
  getLocationById(id: string): Promise<ILocation> {
    return this.dataService.locations.getLocationById(id);
  }
  createLocation(createLocationInput: CreateLocationInput): Promise<ILocation> {
    const location =
      this.locationFactoryService.createLocation(createLocationInput);
    return this.dataService.locations.createLocation(location);
  }
  updateLocation(
    id: string,
    updateLocationInput: UpdateLocationInput,
  ): Promise<ILocation> {
    const location =
      this.locationFactoryService.updateLocation(updateLocationInput);
    return this.dataService.locations.updateLocation(id, location);
  }
  removeLocation(id: string): Promise<ILocation> {
    return this.dataService.locations.removeLocation(id);
  }
}
