import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { ProductItemType } from 'src/product-items/domain/object-types/product-item.type';
import { ReviewType } from 'src/reviews/domain/object-types/review.type';
import { ShopOrderType } from 'src/shop-orders/domain/object-types/shop-order.type';

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
