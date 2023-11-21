import { Resolver } from '@nestjs/graphql';
import { BaseResolver } from 'src/common/interface-adapters/graphql/resolvers/base-resolver.resolver';
import { UserPaymentMethodUseCases } from 'src/user-payment-methods/application/use-cases/user-payment-method-use-cases';
import {
  CreateUserPaymentMethodInput,
  UpdateUserPaymentMethodInput,
} from 'src/user-payment-methods/domain/dtos/graphql/inputs/user-payment-method.input';
import { UserPaymentMethodType } from 'src/user-payment-methods/interface-adapters/graphql/object-types/user-payment-method.entity.type';

@Resolver(() => UserPaymentMethodType)
export class UserPaymentMethodResolver extends BaseResolver(
  UserPaymentMethodType,
  {
    useCasesRef: UserPaymentMethodUseCases,
    createInputRef: CreateUserPaymentMethodInput,
    updateInputRef: UpdateUserPaymentMethodInput,
  },
) {
  constructor(private userPaymentMethodUseCases: UserPaymentMethodUseCases) {
    super(userPaymentMethodUseCases);
  }
}
