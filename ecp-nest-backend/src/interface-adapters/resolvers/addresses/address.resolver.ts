import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationArgs, SearchArgs } from 'src/core/dtos/graphql/args';
import { IAddress } from 'src/core/entities';
import { AddressType } from 'src/core/object-types/addresses/address.type';
import { AddressesUseCases } from 'src/use-cases';

@Resolver(() => AddressType)
export class AddressResolver {
  constructor(private addressUseCases: AddressesUseCases) {}

  @Query(() => [AddressType], { name: 'addresses' })
  getAddressesBy(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs<IAddress>,
  ) {
    return this.addressUseCases.getAddressesBy(
      {},
      { paginationArgs, searchArgs },
    );
  }
}
