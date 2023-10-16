import { ParseUUIDPipe } from '@nestjs/common';
import { Args, Resolver, Query, Mutation, ResolveField } from '@nestjs/graphql';
import { BillboardType } from 'src/billboard/domain/object-types/billboard.type';
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
import { StoreType } from 'src/stores/domain/object-types/store.type';
import { BillboardUseCases } from '../../../billboard/application/use-cases/billboard-use-cases';
import { CategoryType } from 'src/categories/domain/object-types/category.type';
import { CategoryUseCases } from 'src/categories/application/use-cases/category-use-cases';

@Resolver(() => StoreType)
export class StoreResolver {
  constructor(
    private storeUseCases: StoreUseCases,
    private billboardUseCases: BillboardUseCases,
    private categoryUseCases: CategoryUseCases,
  ) {}

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

  // Resolve fields
  @ResolveField(() => [BillboardType], { name: 'billboards' })
  async getBillboards(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ) {
    return this.billboardUseCases.getAllBillboards({
      paginationArgs,
      searchArgs,
    });
  }

  @ResolveField(() => [CategoryType], { name: 'categories' })
  async getCategories(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ) {
    return this.categoryUseCases.getAllCategories({
      paginationArgs,
      searchArgs,
    });
  }
}
