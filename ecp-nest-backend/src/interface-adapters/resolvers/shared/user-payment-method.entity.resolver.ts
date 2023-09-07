import { ParseUUIDPipe } from '@nestjs/common';
import { Resolver, Args, ID, Mutation, Query } from '@nestjs/graphql';
import {
  PaginationArgs,
  SearchArgs,
  CreateUserPaymentMethodInput,
  UpdateUserPaymentMethodInput,
} from 'src/core/dtos';
import { IUserPaymentMethod } from 'src/core/entities';
import { UserPaymentMethodType } from 'src/core/object-types';
import { UserPaymentMethodUseCases } from 'src/use-cases';

@Resolver(() => UserPaymentMethodType)
export class UserPaymentMethodResolver {
  constructor(private userPaymentMethodUseCases: UserPaymentMethodUseCases) {}

  @Query(() => [UserPaymentMethodType], { name: 'userPaymentMethods' })
  getAllUserPaymentMethod(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ): Promise<IUserPaymentMethod[]> {
    return this.userPaymentMethodUseCases.getAllUserPaymentMethods({
      paginationArgs,
      searchArgs,
    });
  }

  @Query(() => [UserPaymentMethodType], { name: 'userPaymentMethodsByUser' })
  getUserPaymentMethodsByUser(
    @Args({ name: 'term', type: () => String }) term: string,
    @Args() paginationArgs: PaginationArgs,
  ): Promise<IUserPaymentMethod[]> {
    return this.userPaymentMethodUseCases.getUserPaymentMethodsBy(
      term,
      ['user'],
      paginationArgs,
    );
  }

  @Query(() => [UserPaymentMethodType], {
    name: 'userPaymentMethodsByPaymentMethod',
  })
  getUserPaymentMethodsByPaymentMethod(
    @Args({ name: 'term', type: () => String }) term: string,
    @Args() paginationArgs: PaginationArgs,
  ): Promise<IUserPaymentMethod[]> {
    return this.userPaymentMethodUseCases.getUserPaymentMethodsBy(
      term,
      ['paymentMethod'],
      paginationArgs,
    );
  }

  @Query(() => UserPaymentMethodType, { name: 'userPaymentMethod' })
  getUserPaymentMethodById(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<IUserPaymentMethod> {
    return this.userPaymentMethodUseCases.getUserPaymentMethodById(id);
  }

  @Mutation(() => UserPaymentMethodType)
  createUserPaymentMethod(
    @Args() createUserPaymentMethodInput: CreateUserPaymentMethodInput,
  ): Promise<IUserPaymentMethod> {
    return this.userPaymentMethodUseCases.createUserPaymentMethod(
      createUserPaymentMethodInput,
    );
  }

  @Mutation(() => UserPaymentMethodType)
  updateUserPaymentMethod(
    @Args() updateUserPaymentMethodInput: UpdateUserPaymentMethodInput,
  ): Promise<IUserPaymentMethod> {
    return this.userPaymentMethodUseCases.updateUserPaymentMethod(
      updateUserPaymentMethodInput.id,
      updateUserPaymentMethodInput,
    );
  }

  @Mutation(() => UserPaymentMethodType)
  removeUserPaymentMethod(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<IUserPaymentMethod> {
    return this.userPaymentMethodUseCases.removeUserPaymentMethod(id);
  }
}
