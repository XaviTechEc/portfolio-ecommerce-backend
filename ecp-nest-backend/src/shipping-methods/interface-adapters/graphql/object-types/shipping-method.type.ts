import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { ShopOrderType } from 'src/shop-orders/interface-adapters/graphql/object-types/shop-order.type';

@ObjectType()
export class ShippingMethodType extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => Float, { defaultValue: 0 })
  price: number;

  // Relations
  @Field(() => [ShopOrderType])
  shopOrders: ShopOrderType[];
}
