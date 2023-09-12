import { ParseUUIDPipe } from '@nestjs/common';
import {
  Resolver,
  Args,
  ID,
  ResolveField,
  Parent,
  Query,
} from '@nestjs/graphql';
import { AddressType } from 'src/addresses/domain/object-types/address.type';
import {
  PaginationArgs,
  SearchArgs,
} from 'src/common/domain/dtos/graphql/args';
import { PaymentMethodType } from 'src/payment-methods/domain/object-types/payment-method.type';
import { UserAddressUseCases } from 'src/user-addresses/application/use-cases/user-address-use-case';
import { UserPaymentMethodUseCases } from 'src/user-payment-methods/application/use-cases/user-payment-method-use-cases';
import { UserUseCases } from 'src/users/application/use-cases/user-use-cases';
import { IUser } from 'src/users/domain/entities/user.entity';
import { UserObjType } from 'src/users/domain/object-types/user.type';

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
