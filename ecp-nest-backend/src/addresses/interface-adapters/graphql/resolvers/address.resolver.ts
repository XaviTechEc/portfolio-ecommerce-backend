import { Resolver } from '@nestjs/graphql';
import { AddressesUseCases } from 'src/addresses/application/use-cases';
import {
  CreateAddressInput,
  UpdateAddressInput,
} from 'src/addresses/domain/dtos/graphql/inputs/address.input';
import { AddressType } from 'src/addresses/interface-adapters/graphql/object-types/address.type';
import { BaseResolver } from 'src/common/interface-adapters/graphql/resolvers/base-resolver.resolver';

@Resolver(() => AddressType)
export class AddressResolver extends BaseResolver(AddressType, {
  useCasesRef: AddressesUseCases,
  createInputRef: CreateAddressInput,
  updateInputRef: UpdateAddressInput,
}) {
  constructor(private addressesUseCases: AddressesUseCases) {
    super(addressesUseCases);
  }
}
