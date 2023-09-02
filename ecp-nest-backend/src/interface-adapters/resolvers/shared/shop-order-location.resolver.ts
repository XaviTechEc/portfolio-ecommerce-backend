import { ParseUUIDPipe } from '@nestjs/common';
import { Resolver, Args, ID, Mutation, Query } from '@nestjs/graphql';
import {
  PaginationArgs,
  SearchArgs,
  CreateShopOrderLocationInput,
  UpdateShopOrderLocationInput,
} from 'src/core/dtos';
import { IShopOrderLocation } from 'src/core/entities';
import { ShopOrderLocationType } from 'src/core/object-types';
import { ShopOrderLocationUseCases } from 'src/use-cases';

@Resolver(() => ShopOrderLocationType)
export class ShopOrderLocationResolver {
  constructor(private shopOrderLocationUseCases: ShopOrderLocationUseCases) {}

  @Query(() => [ShopOrderLocationType], { name: 'shopOrderLocations' })
  getAllShopOrderLocation(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs<IShopOrderLocation>,
  ): Promise<IShopOrderLocation[]> {
    return this.shopOrderLocationUseCases.getAllShopOrderLocation({
      paginationArgs,
      searchArgs,
    });
  }

  @Query(() => ShopOrderLocationType, { name: 'shopOrderLocation' })
  getShopOrderLocationById(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<IShopOrderLocation> {
    return this.shopOrderLocationUseCases.getShopOrderLocationById(id);
  }

  @Mutation(() => ShopOrderLocationType)
  createShopOrderLocation(
    @Args() createShopOrderLocationInput: CreateShopOrderLocationInput,
  ): Promise<IShopOrderLocation> {
    return this.shopOrderLocationUseCases.createShopOrderLocation(
      createShopOrderLocationInput,
    );
  }

  @Mutation(() => ShopOrderLocationType)
  updateShopOrderLocation(
    @Args() updateShopOrderLocationInput: UpdateShopOrderLocationInput,
  ): Promise<IShopOrderLocation> {
    return this.shopOrderLocationUseCases.updateShopOrderLocation(
      updateShopOrderLocationInput.id,
      updateShopOrderLocationInput,
    );
  }

  @Mutation(() => ShopOrderLocationType)
  removeShopOrderLocation(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<IShopOrderLocation> {
    return this.shopOrderLocationUseCases.removeShopOrderLocation(id);
  }
}