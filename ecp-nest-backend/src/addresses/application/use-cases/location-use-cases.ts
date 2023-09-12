import { Injectable } from '@nestjs/common';
import { IAddressDataSourceService } from 'src/addresses/domain/abstracts/services/address-datasource.abstract.service';
import {
  CreateLocationInput,
  UpdateLocationInput,
} from 'src/addresses/domain/dtos/graphql/inputs/location.input';
import { ILocation } from 'src/addresses/domain/entities/location.entity';
import { LocationFactoryService } from './factory';

@Injectable()
export class LocationUseCases {
  constructor(
    private dataService: IAddressDataSourceService,
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
