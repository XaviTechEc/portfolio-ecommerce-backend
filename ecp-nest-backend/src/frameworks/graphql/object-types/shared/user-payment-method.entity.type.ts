import { Field, ID } from '@nestjs/graphql';
import { UserObjType } from '../users/user.type';
import { PaymentMethodType } from '../payments/payment-method.type';

export class UserPaymentMethodType {
  @Field(() => ID)
  id: string;

  @Field(() => UserObjType)
  user: UserObjType;

  @Field(() => PaymentMethodType)
  paymentMethod: PaymentMethodType;

  @Field(() => String)
  provider: string;

  @Field(() => String)
  accountNumber: string;

  @Field(() => Date, { nullable: true })
  expiryDate?: Date;

  @Field(() => String, { nullable: true })
  isDefault?: boolean;
}
