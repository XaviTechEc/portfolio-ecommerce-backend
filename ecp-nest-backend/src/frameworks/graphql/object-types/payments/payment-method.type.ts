import { Field, ID, ObjectType } from '@nestjs/graphql';
import { PaymentMethod } from 'src/core/enums';

@ObjectType()
export class PaymentMethodType {
  @Field(() => ID)
  id: string;

  @Field(() => PaymentMethod)
  value: PaymentMethod;
}
