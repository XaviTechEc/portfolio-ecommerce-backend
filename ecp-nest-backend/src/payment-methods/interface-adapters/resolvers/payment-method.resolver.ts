import { ParseUUIDPipe } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PaymentMethodUseCases } from 'src/payment-methods/application/use-cases/payment-method-use-cases';
import {
  CreatePaymentMethodInput,
  UpdatePaymentMethodInput,
} from 'src/payment-methods/domain/dtos/graphql/inputs/payment-method.input';
import { PaymentMethodType } from 'src/payment-methods/domain/object-types/payment-method.type';

@Resolver(() => PaymentMethodType)
export class PaymentMethodResolver {
  constructor(private paymentMethodUseCases: PaymentMethodUseCases) {}

  @Query(() => PaymentMethodType, { name: 'paymentMethod' })
  getPaymentMethodById(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ) {
    return this.paymentMethodUseCases.getPaymentMethodById(id);
  }

  @Mutation(() => PaymentMethodType)
  createPaymentMethod(
    @Args('createPaymentMethodInput')
    createPaymentMethodInput: CreatePaymentMethodInput,
  ) {
    return this.paymentMethodUseCases.createPaymentMethod(
      createPaymentMethodInput,
    );
  }

  @Mutation(() => PaymentMethodType)
  updatePaymentMethod(
    @Args('updatePaymentMethodInput')
    updatePaymentMethodInput: UpdatePaymentMethodInput,
  ) {
    return this.paymentMethodUseCases.updatePaymentMethod(
      updatePaymentMethodInput.id,
      updatePaymentMethodInput,
    );
  }

  @Mutation(() => PaymentMethodType)
  removePaymentMethod(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ) {
    return this.paymentMethodUseCases.removePaymentMethod(id);
  }
}
