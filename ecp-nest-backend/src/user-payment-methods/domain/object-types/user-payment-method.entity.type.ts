import { ObjectType, Field, ID } from '@nestjs/graphql';
import { PaymentMethodType } from 'src/payment-methods/domain/object-types/payment-method.type';
import { ShopOrderType } from 'src/shop-orders/domain/object-types/shop-order.type';
import { UserObjType } from 'src/users/domain/object-types/user.type';

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
