import { ParseUUIDPipe } from '@nestjs/common';
import { Resolver, Args, ID, Mutation, Query } from '@nestjs/graphql';
import {
  PaginationArgs,
  SearchArgs,
  CreateUserAddressInput,
  UpdateUserAddressInput,
} from 'src/core/dtos';
import { IUserAddress } from 'src/core/entities';
import { UserAddressType } from 'src/core/object-types';
import { UserAddressUseCases } from 'src/use-cases';

@Resolver(() => UserAddressType)
export class UserAddressResolver {
  constructor(private userAddressUseCases: UserAddressUseCases) {}

  @Query(() => [UserAddressType], { name: 'userAddresses' })
  getAllUserAddress(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ): Promise<IUserAddress[]> {
    return this.userAddressUseCases.getAllUserAddress({
      paginationArgs,
      searchArgs,
    });
  }

  @Query(() => [UserAddressType], { name: 'userAddressesByUser' })
  getUserAddressByUser(
    @Args({ name: 'term', type: () => String }) term: string,
    @Args() paginationArgs: PaginationArgs,
  ): Promise<IUserAddress[]> {
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
  ): Promise<IUserAddress[]> {
    return this.userAddressUseCases.getUserAddressesBy(
      term,
      ['address'],
      paginationArgs,
    );
  }

  @Query(() => UserAddressType, { name: 'userAddress' })
  getUserAddressById(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<IUserAddress> {
    return this.userAddressUseCases.getUserAddressById(id);
  }

  @Mutation(() => UserAddressType)
  createUserAddress(
    @Args('createUserAddressInput')
    createUserAddressInput: CreateUserAddressInput,
  ): Promise<IUserAddress> {
    return this.userAddressUseCases.createUserAddress(createUserAddressInput);
  }

  @Mutation(() => UserAddressType)
  updateUserAddress(
    @Args('updateUserAddressInput')
    updateUserAddressInput: UpdateUserAddressInput,
  ): Promise<IUserAddress> {
    return this.userAddressUseCases.updateUserAddress(
      updateUserAddressInput.id,
      updateUserAddressInput,
    );
  }

  @Mutation(() => UserAddressType)
  removeUserAddress(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<IUserAddress> {
    return this.userAddressUseCases.removeUserAddress(id);
  }
}
