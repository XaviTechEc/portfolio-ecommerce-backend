import { Injectable } from '@nestjs/common';
import { CreateLocationInput, UpdateLocationInput } from 'src/core/dtos';
import { ILocation } from 'src/core/entities';

@Injectable()
export class LocationFactoryService {
  createLocation(createLocationInput: CreateLocationInput) {
    const newLocation = new ILocation();
    newLocation.lat = createLocationInput.lat;
    newLocation.lng = createLocationInput.lng;
    return newLocation;
  }
  updateLocation(updateLocationInput: UpdateLocationInput) {
    const newLocation = new ILocation();
    newLocation.lat = updateLocationInput.lat;
    newLocation.lng = updateLocationInput.lng;
    return newLocation;
  }
}
