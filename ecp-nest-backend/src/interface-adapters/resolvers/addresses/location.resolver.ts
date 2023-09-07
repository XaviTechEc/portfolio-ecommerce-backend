import { Resolver, Args, ID, Query, Mutation } from '@nestjs/graphql';
import { CreateLocationInput, UpdateLocationInput } from 'src/core/dtos';
import { ILocation } from 'src/core/entities';
import { LocationType } from 'src/core/object-types/addresses/location.type';
import { LocationUseCases } from 'src/use-cases';
import { ParseUUIDPipe } from '@nestjs/common';

@Resolver(() => LocationType)
export class LocationResolver {
  constructor(private locationUseCases: LocationUseCases) {}

  @Query(() => LocationType)
  getLocationById(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<ILocation> {
    return this.locationUseCases.getLocationById(id);
  }

  @Mutation(() => LocationType)
  createLocation(
    @Args('createLocationInput') createLocationInput: CreateLocationInput,
  ): Promise<ILocation> {
    return this.locationUseCases.createLocation(createLocationInput);
  }

  @Mutation(() => LocationType)
  updateLocation(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @Args('updateLocationInput') updateLocationInput: UpdateLocationInput,
  ): Promise<ILocation> {
    return this.locationUseCases.updateLocation(id, updateLocationInput);
  }

  @Mutation(() => LocationType)
  removeLocation(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<ILocation> {
    return this.locationUseCases.removeLocation(id);
  }
}
