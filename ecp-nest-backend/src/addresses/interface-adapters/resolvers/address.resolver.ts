import { ParseUUIDPipe } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateAddressInput, UpdateAddressInput } from 'src/core/dtos';
import { PaginationArgs, SearchArgs } from 'src/core/dtos/graphql/args';
import { IAddress } from 'src/core/entities';
import { AddressType } from 'src/core/object-types';
import { AddressesUseCases } from 'src/use-cases';

@Resolver(() => AddressType)
export class AddressResolver {
  constructor(private addressUseCases: AddressesUseCases) {}

  @Query(() => [AddressType], { name: 'addresses' })
  async getAllAddresses(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ) {
    return this.addressUseCases.getAllAddresses({
      paginationArgs,
      searchArgs,
    });
  }

  @Query(() => [AddressType], { name: 'addressesByCountry' })
  getAddressesByCountry(
    @Args({ name: 'term', type: () => String }) term: string,
    @Args() paginationArgs: PaginationArgs,
  ) {
    return this.addressUseCases.getAddressesBy(
      term,
      ['country'],
      paginationArgs,
    );
  }

  @Query(() => [AddressType], { name: 'addressesByLocation' })
  getAddressesByLocation(
    @Args({ name: 'term', type: () => String }) term: string,
    @Args() paginationArgs: PaginationArgs,
  ) {
    return this.addressUseCases.getAddressesBy(
      term,
      ['location'],
      paginationArgs,
    );
  }

  @Query(() => AddressType, { name: 'address' })
  getAddressById(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<IAddress> {
    return this.addressUseCases.getAddressById(id);
  }

  @Mutation(() => AddressType)
  createAddress(
    @Args('createAddressInput') createAddressInput: CreateAddressInput,
  ): Promise<IAddress> {
    return this.addressUseCases.createAddress(createAddressInput);
  }

  @Mutation(() => AddressType)
  updateAddress(
    @Args('updateAddressInput') updateAddressInput: UpdateAddressInput,
  ): Promise<IAddress> {
    return this.addressUseCases.updateAddress(
      updateAddressInput.id,
      updateAddressInput,
    );
  }

  @Mutation(() => AddressType)
  removeAddress(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<IAddress> {
    return this.addressUseCases.removeAddress(id);
  }
}