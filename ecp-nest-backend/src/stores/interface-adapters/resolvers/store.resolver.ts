import { ParseUUIDPipe } from '@nestjs/common';
import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import {
  PaginationArgs,
  SearchArgs,
} from 'src/common/domain/dtos/graphql/args';
import { StoreUseCases } from 'src/stores/application/use-cases/store-use-cases';
import {
  CreateStoreInput,
  UpdateStoreInput,
} from 'src/stores/domain/dtos/graphql/inputs/store.input';
import { IStore } from 'src/stores/domain/entities/store.entity';
import { StoreType } from 'src/stores/domain/object-types/store-type';

@Resolver(() => StoreType)
export class StoreResolver {
  constructor(private storeUseCases: StoreUseCases) {}

  @Query(() => [StoreType], { name: 'stores' })
  async getAllStores(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ): Promise<IStore[]> {
    return this.storeUseCases.getAllStores({
      paginationArgs,
      searchArgs,
    });
  }

  @Query(() => StoreType, { name: 'store' })
  async getStoreById(
    @Args('id', { type: () => String }, ParseUUIDPipe) id: string,
  ): Promise<IStore> {
    return this.storeUseCases.getStoreById(id);
  }

  @Mutation(() => StoreType)
  async createStore(
    @Args('createStoreInput') createStoreInput: CreateStoreInput,
  ): Promise<IStore> {
    return this.storeUseCases.createStore(createStoreInput);
  }

  @Mutation(() => StoreType)
  async updateStore(
    @Args('updateStoreInput') updateStoreInput: UpdateStoreInput,
  ) {
    return this.storeUseCases.updateStore(
      updateStoreInput.id,
      updateStoreInput,
    );
  }

  @Mutation(() => StoreType)
  async removeStore(
    @Args('id', { type: () => String }, ParseUUIDPipe) id: string,
  ) {
    return this.storeUseCases.removeStore(id);
  }
}
