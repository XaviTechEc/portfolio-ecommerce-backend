import { ParseUUIDPipe } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  PaginationArgs,
  SearchArgs,
} from 'src/common/domain/dtos/graphql/args';
import { ShopOrderLocationUseCases } from 'src/shop-order-locations/application/use-cases/shop-order-location-use-cases';
import {
  CreateShopOrderLocationInput,
  UpdateShopOrderLocationInput,
} from 'src/shop-order-locations/domain/dtos/graphql/inputs/shop-order-location.input';
import { ShopOrderLocationType } from 'src/shop-order-locations/domain/object-types/shop-order-location.type';

@Resolver(() => ShopOrderLocationType)
export class ShopOrderLocationResolver {
  constructor(private shopOrderLocationUseCases: ShopOrderLocationUseCases) {}

  @Query(() => [ShopOrderLocationType], { name: 'shopOrderLocations' })
  getAllShopOrderLocation(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ) {
    return this.shopOrderLocationUseCases.getAllShopOrderLocation({
      paginationArgs,
      searchArgs,
    });
  }

  @Query(() => [ShopOrderLocationType], {
    name: 'shopOrderLocationsByShopOrder',
  })
  getShopOrderLocationsByShopOrder(
    @Args({ name: 'term', type: () => String }) term: string,
    @Args() paginationArgs: PaginationArgs,
  ) {
    return this.shopOrderLocationUseCases.getShopOrderLocationsBy(
      term,
      ['shopOrder'],
      paginationArgs,
    );
  }

  @Query(() => [ShopOrderLocationType], {
    name: 'shopOrderLocationsByLocation',
  })
  getShopOrderLocationsByLocation(
    @Args({ name: 'term', type: () => String }) term: string,
    @Args() paginationArgs: PaginationArgs,
  ) {
    return this.shopOrderLocationUseCases.getShopOrderLocationsBy(
      term,
      ['location'],
      paginationArgs,
    );
  }

  @Query(() => ShopOrderLocationType, { name: 'shopOrderLocation' })
  getShopOrderLocationById(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ) {
    return this.shopOrderLocationUseCases.getShopOrderLocationById(id);
  }

  @Mutation(() => ShopOrderLocationType)
  createShopOrderLocation(
    @Args('createShopOrderLocationInput')
    createShopOrderLocationInput: CreateShopOrderLocationInput,
  ) {
    return this.shopOrderLocationUseCases.createShopOrderLocation(
      createShopOrderLocationInput,
    );
  }

  @Mutation(() => ShopOrderLocationType)
  updateShopOrderLocation(
    @Args('updateShopOrderLocationInput')
    updateShopOrderLocationInput: UpdateShopOrderLocationInput,
  ) {
    return this.shopOrderLocationUseCases.updateShopOrderLocation(
      updateShopOrderLocationInput.id,
      updateShopOrderLocationInput,
    );
  }

  @Mutation(() => ShopOrderLocationType)
  removeShopOrderLocation(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ) {
    return this.shopOrderLocationUseCases.removeShopOrderLocation(id);
  }
}
