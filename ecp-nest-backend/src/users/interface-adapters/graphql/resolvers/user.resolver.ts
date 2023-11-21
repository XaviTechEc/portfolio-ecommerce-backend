import { ParseUUIDPipe } from '@nestjs/common';
import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import {
  PaginationArgs,
  SearchArgs,
} from 'src/common/domain/dtos/graphql/args';
import { UserAddressUseCases } from 'src/user-addresses/application/use-cases/user-address-use-case';
import { UserPaymentMethodUseCases } from 'src/user-payment-methods/application/use-cases/user-payment-method-use-cases';
import { UserUseCases } from 'src/users/application/use-cases/user-use-cases';
import { UserObjType } from 'src/users/interface-adapters/graphql/object-types/user.type';
import { GetAllUsersResponse } from '../object-types/get-all-users-response.type';

@Resolver(() => UserObjType)
export class UserResolver {
  constructor(
    private userUseCases: UserUseCases,
    private userAddressUseCases: UserAddressUseCases,
    private userPaymentMethodUseCases: UserPaymentMethodUseCases,
  ) {}

  @Query(() => GetAllUsersResponse, { name: 'users' })
  getAllUsers(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ) {
    return this.userUseCases.getAllUsers({
      paginationArgs,
      searchArgs,
    });
  }

  @Query(() => UserObjType, { name: 'user' })
  getUserById(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string) {
    return this.userUseCases.getUserById(id);
  }

  // === Resolve Fields ===
  // @ResolveField(() => [AddressType], { name: 'addresses' })
  // getAllAddresses(
  //   @Parent() user: UserObjType,
  //   @Args() paginationArgs: PaginationArgs,
  // ) {
  //   return this.userAddressUseCases.getUserAddressesBy(
  //     user.id,
  //     ['user'],
  //     paginationArgs,
  //   );
  // }

  // @ResolveField(() => [PaymentMethodType], { name: 'paymentMethods' })
  // getAllPaymentMethods(
  //   @Parent() user: UserObjType,
  //   @Args() paginationArgs: PaginationArgs,
  // ) {
  //   return this.userPaymentMethodUseCases.getUserPaymentMethodsBy(
  //     user.id,
  //     ['user'],
  //     paginationArgs,
  //   );
  // }
}
