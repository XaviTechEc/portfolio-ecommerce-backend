import { Resolver } from '@nestjs/graphql';
import { BaseResolver } from 'src/common/interface-adapters/graphql/resolvers/base-resolver.resolver';
import { UserAddressUseCases } from 'src/user-addresses/application/use-cases/user-address-use-case';
import {
  CreateUserAddressInput,
  UpdateUserAddressInput,
} from 'src/user-addresses/domain/dtos/graphql/inputs/user-address.input';
import { UserAddressType } from 'src/user-addresses/interface-adapters/graphql/object-types/user-address.type';

@Resolver(() => UserAddressType)
export class UserAddressResolver extends BaseResolver(UserAddressType, {
  useCasesRef: UserAddressUseCases,
  createInputRef: CreateUserAddressInput,
  updateInputRef: UpdateUserAddressInput,
}) {
  constructor(private userAddressUseCases: UserAddressUseCases) {
    super(userAddressUseCases);
  }
}
