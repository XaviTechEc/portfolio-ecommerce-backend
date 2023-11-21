import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { PaymentMethodType } from 'src/payment-methods/interface-adapters/graphql/object-types/payment-method.type';
import { ShopOrderType } from 'src/shop-orders/interface-adapters/graphql/object-types/shop-order.type';
import { UserObjType } from 'src/users/interface-adapters/graphql/object-types/user.type';

@ObjectType()
export class UserPaymentMethodType extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
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
