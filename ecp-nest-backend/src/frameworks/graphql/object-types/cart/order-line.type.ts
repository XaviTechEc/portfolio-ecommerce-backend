import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { ProductItemType } from '../products/product-item.type';
import { ShopOrderType } from './shop-order.type';
import { ReviewType } from '../reviews/review.type';

@ObjectType()
export class OrderLineType {
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
