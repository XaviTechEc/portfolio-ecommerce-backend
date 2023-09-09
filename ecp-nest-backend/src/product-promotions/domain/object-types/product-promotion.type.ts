import { Field, ObjectType } from '@nestjs/graphql';
import { ProductType } from '../products/product.type';
import { PromotionType } from '../promotions/promotion.type';

@ObjectType()
export class ProductPromotionType {
  @Field(() => ProductType)
  product: ProductType;

  @Field(() => PromotionType)
  promotion: PromotionType;
}
