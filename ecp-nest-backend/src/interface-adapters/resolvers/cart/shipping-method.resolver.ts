import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreateShippingMethodInput,
  PaginationArgs,
  SearchArgs,
  UpdateShippingMethodInput,
} from 'src/core/dtos';
import { IShippingMethod } from 'src/core/entities';
import { ShippingMethodType } from 'src/core/object-types';
import { ShippingMethodUseCases } from 'src/use-cases';

@Resolver(() => ShippingMethodType)
export class ShippingMethodResolver {
  constructor(private shippingMethodUseCases: ShippingMethodUseCases) {}

  @Query(() => [ShippingMethodType], { name: 'shippingMethod' })
  getAllShippingMethod(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs<IShippingMethod>,
  ): Promise<IShippingMethod[]> {
    return this.shippingMethodUseCases.getAllShippingMethods({
      paginationArgs,
      searchArgs,
    });
  }

  @Query(() => ShippingMethodType, { name: 'shippingMethod' })
  getShippingMethodById(id: string): Promise<IShippingMethod> {
    return this.shippingMethodUseCases.getShippingMethodById(id);
  }

  @Mutation(() => ShippingMethodType)
  createShippingMethod(
    createShippingMethodInput: CreateShippingMethodInput,
  ): Promise<IShippingMethod> {
    return this.shippingMethodUseCases.createShippingMethod(
      createShippingMethodInput,
    );
  }

  @Mutation(() => ShippingMethodType)
  updateShippingMethod(
    id: string,
    updateShippingMethodInput: UpdateShippingMethodInput,
  ): Promise<IShippingMethod> {
    return this.shippingMethodUseCases.updateShippingMethod(
      id,
      updateShippingMethodInput,
    );
  }

  @Mutation(() => ShippingMethodType)
  removeShippingMethod(id: string): Promise<IShippingMethod> {
    return this.shippingMethodUseCases.removeShippingMethod(id);
  }
}
