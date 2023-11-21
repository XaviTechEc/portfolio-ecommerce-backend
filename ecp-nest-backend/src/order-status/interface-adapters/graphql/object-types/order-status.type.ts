import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { ShopOrderType } from 'src/shop-orders/interface-adapters/graphql/object-types/shop-order.type';
import { StatusValue } from '../../../domain/enums/status-value.enum';

@ObjectType()
export class OrderStatusType extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  @Field(() => ID)
  id: string;

  @Field(() => StatusValue)
  statusValue: StatusValue;

  // Relations
  @Field(() => [ShopOrderType])
  shopOrders: ShopOrderType[];
}
