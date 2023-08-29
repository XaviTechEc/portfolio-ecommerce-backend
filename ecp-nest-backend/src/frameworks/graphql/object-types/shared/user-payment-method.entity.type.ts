import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserObjType } from '../users/user.type';
import { PaymentMethodType } from '../payments/payment-method.type';
import { ShopOrderType } from '../cart/shop-order.type';

@ObjectType()
export class UserPaymentMethodType {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  provider: string;

  @Field(() => String)
  accountNumber: string;

  @Field(() => Date, { nullable: true })
  expiryDate?: Date;

  @Field(() => Boolean, { nullable: true, defaultValue: true })
  isDefault?: boolean;

  // Relations
  @Field(() => [ShopOrderType])
  shopOrders: ShopOrderType[];

  @Field(() => UserObjType)
  user: UserObjType;

  @Field(() => PaymentMethodType)
  paymentMethod: PaymentMethodType;
}
