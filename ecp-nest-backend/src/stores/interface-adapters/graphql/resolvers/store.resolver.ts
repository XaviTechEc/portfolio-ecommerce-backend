import { Resolver } from '@nestjs/graphql';
import { BaseResolver } from 'src/common/interface-adapters/graphql/resolvers/base-resolver.resolver';
import { StoreUseCases } from 'src/stores/application/use-cases/store-use-cases';
import {
  CreateStoreInput,
  UpdateStoreInput,
} from 'src/stores/domain/dtos/graphql/inputs/store.input';
import { StoreType } from 'src/stores/interface-adapters/graphql/object-types/store.type';

@Resolver(() => StoreType)
export class StoreResolver extends BaseResolver(StoreType, {
  useCasesRef: StoreUseCases,
  createInputRef: CreateStoreInput,
  updateInputRef: UpdateStoreInput,
}) {
  constructor(private storeUseCases: StoreUseCases) {
    super(storeUseCases);
  }
}
