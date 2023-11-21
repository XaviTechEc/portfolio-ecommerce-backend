import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { ProductItemType } from 'src/product-items/interface-adapters/graphql/object-types/product-item.type';
import { ReviewType } from 'src/reviews/interface-adapters/graphql/object-types/review.type';
import { ShopOrderType } from 'src/shop-orders/interface-adapters/graphql/object-types/shop-order.type';

@ObjectType()
export class OrderLineType extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  @Field(() => ID)
  id: string;

  @Field(() => Float)
  quantity: number;

  @Field(() => Float)
  totalPrice: number;

  // Relations
  @Field(() => [ReviewType])
  reviews: ReviewType[];

  @Field(() => ProductItemType)
  productItem: ProductItemType;

  @Field(() => ShopOrderType)
  shopOrder: ShopOrderType;
}
