import { Field, ID, ObjectType } from '@nestjs/graphql';
import { PaymentMethod } from 'src/core/enums';
import { UserPaymentMethodType } from '../shared/user-payment-method.entity.type';

@ObjectType()
export class PaymentMethodType {
  @Field(() => ID)
  id: string;

  @Field(() => PaymentMethod)
  value: PaymentMethod;

  // Relations
  @Field(() => [UserPaymentMethodType])
  userPaymentMethods: UserPaymentMethodType[];
}
