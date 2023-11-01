import { ParseUUIDPipe } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  PaginationArgs,
  SearchArgs,
} from 'src/common/domain/dtos/graphql/args';
import { UserAddressUseCases } from 'src/user-addresses/application/use-cases/user-address-use-case';
import {
  CreateUserAddressInput,
  UpdateUserAddressInput,
} from 'src/user-addresses/domain/dtos/graphql/inputs/user-address.input';
import { UserAddressType } from 'src/user-addresses/domain/object-types/user-address.type';

@Resolver(() => UserAddressType)
export class UserAddressResolver {
  constructor(private userAddressUseCases: UserAddressUseCases) {}

  @Query(() => [UserAddressType], { name: 'userAddresses' })
  getAllUserAddress(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ) {
    return this.userAddressUseCases.getAllUserAddress({
      paginationArgs,
      searchArgs,
    });
  }

  @Query(() => [UserAddressType], { name: 'userAddressesByUser' })
  getUserAddressByUser(
    @Args({ name: 'term', type: () => String }) term: string,
    @Args() paginationArgs: PaginationArgs,
  ) {
    return this.userAddressUseCases.getUserAddressesBy(
      term,
      ['user'],
      paginationArgs,
    );
  }

  @Query(() => [UserAddressType], { name: 'userAddressesByAddress' })
  getUserAddressByAddress(
    @Args({ name: 'term', type: () => String }) term: string,
    @Args() paginationArgs: PaginationArgs,
  ) {
    return this.userAddressUseCases.getUserAddressesBy(
      term,
      ['address'],
      paginationArgs,
    );
  }

  @Query(() => UserAddressType, { name: 'userAddress' })
  getUserAddressById(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ) {
    return this.userAddressUseCases.getUserAddressById(id);
  }

  @Mutation(() => UserAddressType)
  createUserAddress(
    @Args('createUserAddressInput')
    createUserAddressInput: CreateUserAddressInput,
  ) {
    return this.userAddressUseCases.createUserAddress(createUserAddressInput);
  }

  @Mutation(() => UserAddressType)
  updateUserAddress(
    @Args('updateUserAddressInput')
    updateUserAddressInput: UpdateUserAddressInput,
  ) {
    return this.userAddressUseCases.updateUserAddress(
      updateUserAddressInput.id,
      updateUserAddressInput,
    );
  }

  @Mutation(() => UserAddressType)
  removeUserAddress(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string) {
    return this.userAddressUseCases.removeUserAddress(id);
  }
}
