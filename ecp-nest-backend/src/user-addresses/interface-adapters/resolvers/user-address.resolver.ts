import { ParseUUIDPipe } from '@nestjs/common';
import { Resolver, Args, ID, Mutation, Query } from '@nestjs/graphql';
import {
  PaginationArgs,
  SearchArgs,
} from 'src/common/domain/dtos/graphql/args';
import { UserAddressUseCases } from 'src/user-addresses/application/use-cases/user-address-use-case';
import {
  CreateUserAddressInput,
  UpdateUserAddressInput,
} from 'src/user-addresses/domain/dtos/graphql/inputs/user-address.input';
import { IUserAddress } from 'src/user-addresses/domain/entities/user-address.entity';
import { UserAddressType } from 'src/user-addresses/domain/object-types/user-address.type';

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
