import { Resolver } from '@nestjs/graphql';
import { LocationsUseCases } from 'src/addresses/application/use-cases';
import {
  CreateLocationInput,
  UpdateLocationInput,
} from 'src/addresses/domain/dtos/graphql/inputs/location.input';
import { LocationType } from 'src/addresses/interface-adapters/graphql/object-types/location.type';
import { BaseResolver } from 'src/common/interface-adapters/graphql/resolvers/base-resolver.resolver';

@Resolver(() => LocationType)
export class LocationsResolver extends BaseResolver(LocationType, {
  useCasesRef: LocationsUseCases,
  createInputRef: CreateLocationInput,
  updateInputRef: UpdateLocationInput,
}) {
  constructor(private locationsUseCases: LocationsUseCases) {
    super(locationsUseCases);
  }
}
