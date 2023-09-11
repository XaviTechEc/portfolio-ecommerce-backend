import { ParseUUIDPipe } from '@nestjs/common';
import { Resolver, Args, ID, Mutation, Query } from '@nestjs/graphql';
import { PaymentMethodUseCases } from 'src/payment-methods/application/use-cases/payment-method-use-cases';
import {
  CreatePaymentMethodInput,
  UpdatePaymentMethodInput,
} from 'src/payment-methods/domain/dtos/graphql/inputs/payment-method.input';
import { IPaymentMethod } from 'src/payment-methods/domain/entities/payment-method.entity';
import { PaymentMethodType } from 'src/payment-methods/domain/object-types/payment-method.type';

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
