import { Resolver } from '@nestjs/graphql';
import { BaseResolver } from 'src/common/interface-adapters/graphql/resolvers/base-resolver.resolver';
import { PaymentMethodUseCases } from 'src/payment-methods/application/use-cases/payment-method-use-cases';
import {
  CreatePaymentMethodInput,
  UpdatePaymentMethodInput,
} from 'src/payment-methods/domain/dtos/graphql/inputs/payment-method.input';
import { PaymentMethodType } from 'src/payment-methods/interface-adapters/graphql/object-types/payment-method.type';

@Resolver(() => PaymentMethodType)
export class PaymentMethodResolver extends BaseResolver(PaymentMethodType, {
  useCasesRef: PaymentMethodUseCases,
  createInputRef: CreatePaymentMethodInput,
  updateInputRef: UpdatePaymentMethodInput,
}) {
  constructor(private paymentMethodUseCases: PaymentMethodUseCases) {
    super(paymentMethodUseCases);
  }
}
