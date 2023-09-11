import { ParseUUIDPipe } from '@nestjs/common';
import {
  Resolver,
  Args,
  ID,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { PaginationArgs, SearchArgs } from 'src/core/dtos';
import { IUser } from 'src/core/entities';
import {
  AddressType,
  PaymentMethodType,
  UserObjType,
} from 'src/core/object-types';
import {
  UserAddressUseCases,
  UserPaymentMethodUseCases,
  UserUseCases,
} from 'src/use-cases';

@Resolver(() => UserObjType)
export class UserResolver {
  constructor(
    private userUseCases: UserUseCases,
    private userAddressUseCases: UserAddressUseCases,
    private userPaymentMethodUseCases: UserPaymentMethodUseCases,
  ) {}

  @Query(() => [UserObjType], { name: 'users' })
  getAllUsers(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ): Promise<IUser[]> {
    return this.userUseCases.getAllUsers({
      paginationArgs,
      searchArgs,
    });
  }

  @Query(() => UserObjType, { name: 'user' })
  getUserById(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<IUser> {
    return this.userUseCases.getUserById(id);
  }

  // === Resolve Fields ===
  @ResolveField(() => [AddressType], { name: 'addresses' })
  getAllAddresses(
    @Parent() user: UserObjType,
    @Args() paginationArgs: PaginationArgs,
  ) {
    return this.userAddressUseCases.getUserAddressesBy(
      user.id,
      ['user'],
      paginationArgs,
    );
  }

  @ResolveField(() => [PaymentMethodType], { name: 'paymentMethods' })
  getAllPaymentMethods(
    @Parent() user: UserObjType,
    @Args() paginationArgs: PaginationArgs,
  ) {
    return this.userPaymentMethodUseCases.getUserPaymentMethodsBy(
      user.id,
      ['user'],
      paginationArgs,
    );
  }
}
