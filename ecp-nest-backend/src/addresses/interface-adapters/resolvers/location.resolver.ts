import { ParseUUIDPipe } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LocationUseCases } from 'src/addresses/application/use-cases';
import {
  CreateLocationInput,
  UpdateLocationInput,
} from 'src/addresses/domain/dtos/graphql/inputs/location.input';
import { LocationType } from 'src/addresses/domain/object-types/location.type';

@Resolver(() => LocationType)
export class LocationResolver {
  constructor(private locationUseCases: LocationUseCases) {}

  @Query(() => LocationType)
  getLocationById(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string) {
    return this.locationUseCases.getLocationById(id);
  }

  @Mutation(() => LocationType)
  createLocation(
    @Args('createLocationInput') createLocationInput: CreateLocationInput,
  ) {
    return this.locationUseCases.createLocation(createLocationInput);
  }

  @Mutation(() => LocationType)
  updateLocation(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @Args('updateLocationInput') updateLocationInput: UpdateLocationInput,
  ) {
    return this.locationUseCases.updateLocation(id, updateLocationInput);
  }

  @Mutation(() => LocationType)
  removeLocation(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string) {
    return this.locationUseCases.removeLocation(id);
  }
}
