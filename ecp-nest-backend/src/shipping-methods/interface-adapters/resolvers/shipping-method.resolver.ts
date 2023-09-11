import { ParseUUIDPipe } from '@nestjs/common';
import { Resolver, Args, ID, Mutation, Query } from '@nestjs/graphql';
import {
  PaginationArgs,
  SearchArgs,
} from 'src/common/domain/dtos/graphql/args';
import { ShippingMethodUseCases } from 'src/shipping-methods/application/use-cases/shipping-method-use-cases';
import {
  CreateShippingMethodInput,
  UpdateShippingMethodInput,
} from 'src/shipping-methods/domain/dtos/graphql/inputs/shipping-method.input';
import { IShippingMethod } from 'src/shipping-methods/domain/entities/shipping-method.entity';
import { ShippingMethodType } from 'src/shipping-methods/domain/object-types/shipping-method.type';

@Resolver(() => ShippingMethodType)
export class ShippingMethodResolver {
  constructor(private shippingMethodUseCases: ShippingMethodUseCases) {}

  @Query(() => [ShippingMethodType], { name: 'shippingMethod' })
  getAllShippingMethod(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ): Promise<IShippingMethod[]> {
    return this.shippingMethodUseCases.getAllShippingMethods({
      paginationArgs,
      searchArgs,
    });
  }

  @Query(() => ShippingMethodType, { name: 'shippingMethod' })
  getShippingMethodById(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<IShippingMethod> {
    return this.shippingMethodUseCases.getShippingMethodById(id);
  }

  @Mutation(() => ShippingMethodType)
  createShippingMethod(
    @Args('createShippingMethodInput')
    createShippingMethodInput: CreateShippingMethodInput,
  ): Promise<IShippingMethod> {
    return this.shippingMethodUseCases.createShippingMethod(
      createShippingMethodInput,
    );
  }

  @Mutation(() => ShippingMethodType)
  updateShippingMethod(
    @Args('updateShippingMethodInput')
    updateShippingMethodInput: UpdateShippingMethodInput,
  ): Promise<IShippingMethod> {
    return this.shippingMethodUseCases.updateShippingMethod(
      updateShippingMethodInput.id,
      updateShippingMethodInput,
    );
  }

  @Mutation(() => ShippingMethodType)
  removeShippingMethod(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<IShippingMethod> {
    return this.shippingMethodUseCases.removeShippingMethod(id);
  }
}
