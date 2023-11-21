import { Injectable } from '@nestjs/common';
import {
  CreateLocationInput,
  UpdateLocationInput,
} from 'src/addresses/domain/dtos/graphql/inputs/location.input';
import { ILocation } from 'src/addresses/domain/entities/location.entity';

@Injectable()
export class LocationFactoryService {
  createLocation(createLocationInput: CreateLocationInput) {
    const newLocation = new ILocation();
    newLocation.lat = createLocationInput.lat;
    newLocation.lng = createLocationInput.lng;
    newLocation.active = createLocationInput.active;
    return newLocation;
  }
  updateLocation(updateLocationInput: UpdateLocationInput) {
    const newLocation = new ILocation();
    newLocation.id = updateLocationInput.id;
    newLocation.lat = updateLocationInput.lat;
    newLocation.lng = updateLocationInput.lng;
    newLocation.active = updateLocationInput.active;
    return newLocation;
  }
}
