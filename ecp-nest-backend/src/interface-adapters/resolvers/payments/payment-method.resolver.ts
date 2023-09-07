import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PaymentMethodType } from 'src/core/object-types';
import { PaymentMethodUseCases } from '../../../use-cases/payments/payment-method-use-cases';
import { IPaymentMethod } from 'src/core/entities';
import { ParseUUIDPipe } from '@nestjs/common';
import {
  CreatePaymentMethodInput,
  UpdatePaymentMethodInput,
} from 'src/core/dtos';

@Resolver(() => PaymentMethodType)
export class PaymentMethodResolver {
  constructor(private paymentMethodUseCases: PaymentMethodUseCases) {}

  @Query(() => PaymentMethodType, { name: 'paymentMethod' })
  getPaymentMethodById(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<IPaymentMethod> {
    return this.paymentMethodUseCases.getPaymentMethodById(id);
  }

  @Mutation(() => PaymentMethodType)
  createPaymentMethod(
    @Args('createPaymentMethodInput')
    createPaymentMethodInput: CreatePaymentMethodInput,
  ): Promise<IPaymentMethod> {
    return this.paymentMethodUseCases.createPaymentMethod(
      createPaymentMethodInput,
    );
  }

  @Mutation(() => PaymentMethodType)
  updatePaymentMethod(
    @Args('updatePaymentMethodInput')
    updatePaymentMethodInput: UpdatePaymentMethodInput,
  ): Promise<IPaymentMethod> {
    return this.paymentMethodUseCases.updatePaymentMethod(
      updatePaymentMethodInput.id,
      updatePaymentMethodInput,
    );
  }

  @Mutation(() => PaymentMethodType)
  removePaymentMethod(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<IPaymentMethod> {
    return this.paymentMethodUseCases.removePaymentMethod(id);
  }
}
