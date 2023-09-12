import { ParseUUIDPipe } from '@nestjs/common';
import { Resolver, Args, ID, Mutation, Query } from '@nestjs/graphql';
import { LocationUseCases } from 'src/addresses/application/use-cases';
import {
  CreateLocationInput,
  UpdateLocationInput,
} from 'src/addresses/domain/dtos/graphql/inputs/location.input';
import { ILocation } from 'src/addresses/domain/entities/location.entity';
import { LocationType } from 'src/addresses/domain/object-types/location.type';

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
