import { ParseUUIDPipe } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AddressesUseCases } from 'src/addresses/application/use-cases';
import {
  CreateAddressInput,
  UpdateAddressInput,
} from 'src/addresses/domain/dtos/graphql/inputs/address.input';
import { AddressType } from 'src/addresses/domain/object-types/address.type';
import {
  PaginationArgs,
  SearchArgs,
} from 'src/common/domain/dtos/graphql/args';

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
  getAddressById(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string) {
    return this.addressUseCases.getAddressById(id);
  }

  @Mutation(() => AddressType)
  createAddress(
    @Args('createAddressInput') createAddressInput: CreateAddressInput,
  ) {
    return this.addressUseCases.createAddress(createAddressInput);
  }

  @Mutation(() => AddressType)
  updateAddress(
    @Args('updateAddressInput') updateAddressInput: UpdateAddressInput,
  ) {
    return this.addressUseCases.updateAddress(
      updateAddressInput.id,
      updateAddressInput,
    );
  }

  @Mutation(() => AddressType)
  removeAddress(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string) {
    return this.addressUseCases.removeAddress(id);
  }
}
