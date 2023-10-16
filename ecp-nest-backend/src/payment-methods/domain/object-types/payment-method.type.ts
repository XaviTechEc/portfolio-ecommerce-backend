import { ObjectType, Field, ID } from '@nestjs/graphql';
import { UserPaymentMethodType } from 'src/user-payment-methods/domain/object-types/user-payment-method.entity.type';
import { PaymentMethod } from '../enums/payment-methods.enum';

@ObjectType()
export class PaymentMethodType {
  @Field(() => ID)
  id: string;

  @Field(() => PaymentMethod)
  value: PaymentMethod;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  // Relations
  @Field(() => [UserPaymentMethodType])
  userPaymentMethods: UserPaymentMethodType[];
}
