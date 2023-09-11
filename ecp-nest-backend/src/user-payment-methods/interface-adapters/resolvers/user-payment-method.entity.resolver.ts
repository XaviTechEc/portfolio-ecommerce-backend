import { ParseUUIDPipe } from '@nestjs/common';
import { Resolver, Args, ID, Mutation, Query } from '@nestjs/graphql';
import {
  PaginationArgs,
  SearchArgs,
} from 'src/common/domain/dtos/graphql/args';
import { UserPaymentMethodUseCases } from 'src/user-payment-methods/application/use-cases/user-payment-method-use-cases';
import {
  CreateUserPaymentMethodInput,
  UpdateUserPaymentMethodInput,
} from 'src/user-payment-methods/domain/dtos/graphql/inputs/user-payment-method.input';
import { IUserPaymentMethod } from 'src/user-payment-methods/domain/entities/user-payment-method.entity';
import { UserPaymentMethodType } from 'src/user-payment-methods/domain/object-types/user-payment-method.entity.type';

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
    @Args('createUserPaymentMethodInput')
    createUserPaymentMethodInput: CreateUserPaymentMethodInput,
  ): Promise<IUserPaymentMethod> {
    return this.userPaymentMethodUseCases.createUserPaymentMethod(
      createUserPaymentMethodInput,
    );
  }

  @Mutation(() => UserPaymentMethodType)
  updateUserPaymentMethod(
    @Args('updateUserPaymentMethodInput')
    updateUserPaymentMethodInput: UpdateUserPaymentMethodInput,
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
