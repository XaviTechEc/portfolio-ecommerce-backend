import { Injectable } from '@nestjs/common';
import { ILocationsRepository } from 'src/core/abstracts/repositories';
import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
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
    throw new Error('Method not implemented.');
  }
  createLocation(createLocationInput: CreateLocationInput): Promise<ILocation> {
    throw new Error('Method not implemented.');
  }
  updateLocation(
    id: string,
    updateLocationInput: UpdateLocationInput,
  ): Promise<ILocation> {
    throw new Error('Method not implemented.');
  }
  removeLocation(id: string): Promise<ILocation> {
    throw new Error('Method not implemented.');
  }
}
