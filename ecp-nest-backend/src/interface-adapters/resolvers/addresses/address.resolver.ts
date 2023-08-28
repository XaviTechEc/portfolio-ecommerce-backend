import { Resolver } from '@nestjs/graphql';
import { AddressesUseCases } from '../../../use-cases/addresses/address-use-cases';

@Resolver()
export class AddressResolver {
  constructor(private addressesUseCases: AddressesUseCases) {}
}
